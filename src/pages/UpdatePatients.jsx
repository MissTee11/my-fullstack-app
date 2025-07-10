import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate,useParams } from 'react-router-dom';
import { getSinglePatient, updatePatient } from '../api'; 
import { formatDateInput } from '../utilities/DateFormat';



function UpdatePatient(){

    const{id} = useParams();
    const navigate = useNavigate();
    const[messageText, setMessageText]=useState("")

    const[values, setValues]= useState({
      first_name: '',
      last_name: '',
      gender: '',
      date_of_birth: '',
      contact_number: '',
      city: '',
    });

    useEffect(() => {
      const fetchPatient = async () => {
        try {
          const res = await getSinglePatient(id);
          console.log(res.data);
          setValues(res.data);
           
        } catch (err) {
          console.error("Error fetching patient:", err);
        }
      };
      fetchPatient();
    }, [id]);
    

    const handleChanges = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    const resetInfo=() =>{
      setValues({first_name: '', last_name: '', date_of_birth:'', gender:'',contact_number:'',city:'',});
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(id, values);
      setMessageText("Patient updated successfully!")

      setTimeout(()=>{
        setMessageText("");
        navigate('/Patients');
      }, 3000)

    } catch (err) {
      console.error("Error updating patient:", err);
      setMessageText("Failed to update patient. Please try again.")
    }
  };

    return(
    <div>
        <Sidebar/>
        <div className="MainContent">
            <h1 className='PageHeader'> Patient Update Form</h1>

            <button className="BackBtn" type="button" onClick={() => navigate('/Patients')}><IoMdArrowRoundBack/>Back</button>
            
            <form onSubmit={handleSubmit} className="AddUpdateForm">
              
              <label htmlFor="first_name" >First Name</label>
                <input type="text" placeholder='Enter patient name'name='first_name' id='first_name'
                onChange={(e)=> handleChanges(e)} 
                required
                value={values.first_name}/>
              
              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name' id='last_name'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.last_name}/>
              
              <label htmlFor="date_of_birth" >Date Of Birth</label> 
                <input type="date" placeholder='Enter patient date of birth' name='date_of_birth' id='date_of_birth'
                onChange={(e)=> handleChanges(e)}
                required 
                value={formatDateInput(values.date_of_birth)}/>
            
              <label htmlFor="gender" >Gender</label>
                <select name='gender'
                id='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            
              <label htmlFor="contact_number" >Contact Number</label>
                <input type="number" className='cell'  placeholder='Enter Phone Number'name='contact_number'id='contact_number'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.contact_number}/>
              
              <label htmlFor="city" >City of Residence</label>
                <input type="text" placeholder='Enter Patient City of residence' name='city' id='city'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.city}/>
              
              <div className="Buttons">
                <button className="SaveBtn"type="submit">Save Changes</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>
            </form>

            {messageText &&(
              <div className='popup'>
                <p>{messageText}</p>
              </div>
            )}
            
        </div>
        </div>
    
    )
}
export default UpdatePatient;