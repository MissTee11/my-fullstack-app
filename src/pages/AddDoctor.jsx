import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { createDoctor, getSpecialties } from '../api';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { fetchDoctors } from '../redux/slices/doctorSlice';


function AddDoctor(){
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const[ messageText, setMessageText] = useState("");
  const dispatch = useDispatch();

  const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        specialty: '',
      });

   useEffect(()=>{
   const fetchSpecialty = async () => {
           try {
             const res = await getSpecialties();
             console.log(res.data);
             setSpecialties(res.data);
              
           } catch (err) {
             console.error("Error fetching specialty:", err);
           }
         };
         fetchSpecialty();
       }, []);
  
  const handleChanges = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
    };
   
  const resetInfo=() =>{
           setValues({first_name: '', last_name: '', gender:'', specialty: '',})
    }
   
  const handleSubmit =  async (e) => {
      e.preventDefault();

      try{
        await createDoctor(values);
        dispatch(fetchDoctors());
        setMessageText("Doctor added successfuly!");

        setTimeout(()=>{
          setMessageText("");
          navigate('/Doctors');
        }, 3000);
      }
      catch(error){
        console.error("Error adding doctor", error);
        setMessageText("Failed to add doctor.Please try again.");

        setTimeout(()=>{
          setMessageText("");
        }, 3000)
      }     
    };

    return (
        <div>
            <Sidebar/>
            <div className="MainContent">
            <h1 className='PageHeader'> Doctor Registration</h1>

            <button className="BackBtn" type="button" onClick={() => navigate('/Doctors')}><IoMdArrowRoundBack/>Back</button>

            <form onSubmit={handleSubmit} className="AddUpdateForm">

              <label htmlFor="first_name" > First Name</label>
                <input type="text" placeholder='Enter doctor name' name='first_name' id='first_name'
                 onChange={(e)=> handleChanges(e)} required 
                 value={values.first_name}/>
           
              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name' id='last_name'
                onChange={(e)=> handleChanges(e)} required value={values.last_name}/>
            
              <label htmlFor="gender" >Gender</label>
                <select name='gender'
                id='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
              
              <label htmlFor="specialty" >Specialty</label>
                <select 
                name="specialty" 
                id="specialty" 
                onChange={(e) => handleChanges(e)} 
                required>
                <option value="" disabled>Select specialty</option>
                {specialties.map((specialty)=>(
                  <option key={specialty.id} value={specialty.id}>{specialty.specialty}
                  </option>
                ))}
                </select>

              <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
            </div>
            
            </form>
             {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}

            </div>
        </div>
       
        
      );
}
export default AddDoctor