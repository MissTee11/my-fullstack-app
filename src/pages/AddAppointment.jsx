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
      patient_ID: '',
      doctor_ID: '',
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
        setValues({date: '', time: '', patient_ID:'', doctor_ID:'',status:'',})
      }


    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Appointment Registration</h1>

            <form onSubmit={handleSubmit} className="DetailForm">
                <div>
                <label htmlFor="appointment_date" >Appointment Date</label>
                <input type="date" placeholder='Enter appointment date'name='appointment_date' id='appointment_date'
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.appointment_date}/>
                </div>
                <div>
                <label htmlFor="time" >Time</label>
                <input type="time" placeholder='Enter time' name='time' id='time'
                onChange={(e)=> handleChanges(e)} 
                required value={values.time}/>
                </div>
                <div>
                <label htmlFor="patient_ID">Select Patient</label>
                <select
                name="patient_ID"
                id="patient_ID"
                onChange={handleChanges}
                required
                value={values.patient_ID}
                >
                <option value="" disabled>Select Patient</option>
                <option>John</option>
                <option>Mary</option>
                </select>
                </div>
                <div>
                <label htmlFor="doctor_ID">Select Doctor</label>
                <select
                name="doctor_ID"
                id="doctor_ID"
                onChange={handleChanges}
                required
                value={values.doctor_ID}
                >
                <option value="" disabled>Select Doctor</option>
                <option>John</option>
                <option>Mary</option>
                </select>
                </div>
                <div>
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
                </div>
                
    
            </form> 
        </div>

            </div>

        </div>
    )
}
export default AddAppointments;