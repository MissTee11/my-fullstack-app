import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';


function UpdateDoctor(){
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        specialty: '',
      });
      
   
      const handleChanges = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
     };
   
       const resetInfo=() =>{
           setValues({first_name: '', last_name: '', gender:'', specialty: '',})
         }
   
       const handleSubmit =  async (e) => {
           e.preventDefault();
           navigate('/Doctors');
       };

    return (
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Doctor Update Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name" > First Name</label>
                <input type="text" placeholder='Enter doctor name'name='first_name' 
                 onChange={(e)=> handleChanges(e)} required value={values.first_name}/>
    
                <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name'
                onChange={(e)=> handleChanges(e)} required value={values.last_name}/>

                <label htmlFor="gender"  >Gender</label>
                <select name='gender'
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
                required 
                value={values.specialty}
            >
                <option value="" disabled>Select specialty</option>
                <option value="Male">General Practitioner</option>
                <option value="Female">Surgeon</option>
                </select>
                <div className="Buttons">
                <button class="SaveBtn"type="submit">Save Changes</button>
                <button class="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>
                
    
            </form>
            </div>
          
        </div>
        </div>
        
      );
}
export default UpdateDoctor