import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { createPatient } from '../api';
import { formatDateInput } from '../utilities/DateFormat';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { fetchPatients } from '../redux/slices/patientSlice';

function AddPatient(){

  const [messageText, setMessageText] =useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    try{
      await createPatient(values);
      dispatch(fetchPatients());
      setMessageText("Patient added successfully!");

      setTimeout(() => {
        setMessageText("");
        navigate('/Patients');
    }, 3000)

    }
    catch(error){
      console.error("Error adding patient!", error)
      setMessageText("Failed to add patient. Please try again.");

      setTimeout(() => {
        setMessageText("");
    }, 3000)
    } 
  };
        
    return(
    <div>
        <Sidebar/>
        <div className="MainContent">

            <h1 className='PageHeader'> Patient Registration</h1>

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
                id="gender"
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            
              <label htmlFor="contact_number" >Contact Number</label>
                <input type="number" className='cell'  placeholder='Enter Phone Number'name='contact_number' id='contact_number'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.contact_number}/>
              
              <label htmlFor="city" >City of Residence</label>
                <input type="text" placeholder='Enter Patient City of residence' name='city' id='city'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.city}/>
             
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
    )
}
export default AddPatient;