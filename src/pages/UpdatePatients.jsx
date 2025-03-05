import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdatePatient(){

    const navigate = useNavigate();
    const[values, setValues]= useState({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: '',
      contact_number: '',
      city: '',
    });

    const handleChanges = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };

    const resetInfo=() =>{
      setValues({first_name: '', last_name: '', date_of_birth:'', gender:'',contact_number:'',city:'',});
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/Patients')
    }
        


    return(
    <div>
        <Sidebar/>
        <div className="MainContent">
            <div className="Form">
            <h1> Patient Registration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name" >First Name</label>
                <input type="text" placeholder='Enter patient name'name='first_name' 
                onChange={(e)=> handleChanges(e)} 
                required
                value={values.first_name}/>
            
                <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.last_name}/>
    
                <label htmlFor="date_of_birth" >Date Of Birth</label> 
                <input type="date" placeholder='Enter patient date of birth' name='date_of_birth'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.date_of_birth}/>
    
                <label htmlFor="gender" >Gender</label>
                <select name='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
    
                <label htmlFor="contact_number" >Contact Number</label>
                <input type="number" className='cell'  placeholder='Enter Phone Number'name='contact_number'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.contact_number}/>

                <label htmlFor="city" >City of Residence</label>
                <input type="text" placeholder='Enter Patient City of residence' name='city'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.city}/>
    
                <div className="Buttons">
                <button className="SaveBtn"type="submit">Save Changes</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>
    
            </form>
          
        </div>

        </div>
    </div>
    )
}
export default UpdatePatient;