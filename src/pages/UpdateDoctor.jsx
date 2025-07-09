import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { getSingleDoctor, getSpecialties, updateDoctor } from '../api';


function UpdateDoctor(){

  const {id} = useParams();

  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const[messageText, setMessageText]=useState("")

  const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        specialty: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
            const doctorRes = await getSingleDoctor(id);
            setValues(doctorRes.data);

            const specialtyRes = await getSpecialties();
            setSpecialties(specialtyRes.data);

      } catch (err) {
            console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);
      
   
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    };
   
  const resetInfo=() =>{
    setValues({first_name: '', last_name: '', gender:'', specialty: '',})
    }
   
  const handleSubmit =  async (e) => {
    e.preventDefault();
      try {

            const updatedValues = { ...values, specialty: parseInt(values.specialty) };//backend expects integer

            await updateDoctor(id, updatedValues);
            setMessageText("Doctor updated successfully!")
           
            setTimeout(()=>{
            setMessageText("");
            navigate('/Doctors');
            }, 3000)
           
      } catch (err) {
            console.error("Error updating doctor:", err);
            setMessageText("Failed to update doctor. Please try again.")
            }
       };

    return (
        <div>
            <Sidebar/>
            <div className="MainContent">
            <h1 className='PageHeader'> Doctor Update Form</h1>
            <form onSubmit={handleSubmit} className="AddUpdateForm">

              <label htmlFor="first_name" > First Name</label>
                <input type="text" placeholder='Enter doctor name'name='first_name' id='first_name'
                 onChange={(e)=> handleChanges(e)} required value={values.first_name}/>

              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name' id='last_name'
                onChange={(e)=> handleChanges(e)} required value={values.last_name}/>

              <label htmlFor="gender"  >Gender</label>
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
                value={values.specialty} 
                onChange={(e) => handleChanges(e)} 
                required>
                <option value= "">Select specialty</option>
                {specialties.map((specialty)=>(
                  <option key={specialty.id} value={specialty.id}>{specialty.specialty}
                  </option>
                ))}
                </select>

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
        
      );
}
export default UpdateDoctor