import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function AddAppointments(){

    const statuses = ["Scheduled", "Completed", "Cancelled"];
    const navigate=useNavigate();

     const [values, setValues] = useState({
      appointment_date: '',
      time: '',
      patient_id: '',
      doctor_id: '',
      status:'',
       });

       const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/Appointments');
             
    };

     const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    const resetInfo=() =>{
        setValues({date: '', time: '', patient_id:'', doctor_id:'',status:'',})
      }


    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Appointment Registration</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="appointment_date" >Appointment Date</label>
                <input type="date" placeholder='Enter appointment date'name='appointment_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.appointment_date}/>
    
                <label htmlFor="time" >Time</label>
                <input type="time" placeholder='Enter time' name='time'
                onChange={(e)=> handleChanges(e)} 
                required value={values.time}/>

                <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                required
                value={values.patient_id}
                >
                <option value="" disabled>Select Patient</option>
                <option>John</option>
                <option>Mary</option>
                </select>

                <label htmlFor="doctor_id">Select Doctor</label>
                <select
                name="doctor_id"
                id="doctor_id"
                onChange={handleChanges}
                required
                value={values.doctor_id}
                >
                <option value="" disabled>Select Doctor</option>
                <option>John</option>
                <option>Mary</option>
                </select>

                <label htmlFor="status" >Status</label>
                <select 
                name="status" 
                id="status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.status}>

                <option value="" disabled>Select status</option>
                {statuses.map((status) => (
                <option key={status} value={status}>
                {status}
                 </option>
                ))}
                </select>
                
                <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>
    
            </form>
          
        </div>

            </div>

        </div>
    )
}
export default AddAppointments;