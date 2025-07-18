import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { formatDateInput } from '../utilities/DateFormat';
import { createAppointment, getDoctors, getPatients} from '../api';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { fetchTodaysAppointments } from '../redux/slices/appointmentSlice';

function AddAppointments(){

    const statuses = ["Scheduled", "Completed", "Cancelled"];//status values for appointments
    const navigate=useNavigate();
    const [messageText, setMessageText] = useState("");
    const[ patients, setPatients] = useState([]);
    const[doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();//Redux hook for updating global states

    const [values, setValues] = useState({
      appointment_date: '',
      time: '',
      patient_id: '',
      doctor_id: '',
      status:'',
       });

    useEffect (()=>{
        const fetchData = async ()=>{
          try{
            const docRes= await getDoctors();
            setDoctors(docRes.data);
    
            const patientRes= await getPatients();
            setPatients(patientRes.data);
          }
          catch (err) {
            console.error("Error fetching data:", err);
          }
        };
        fetchData();
      },[]);

       const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createAppointment(values);
            dispatch(fetchTodaysAppointments());//After successful creation, today's appointment list in global state is updated without refreshing the page
            setMessageText("Appointment added successfully!");
        
            setTimeout(() => {
            setMessageText("");
            navigate('/Appointments');
            }, 3000)
        
            }
            catch(error){
            console.error("Error adding appointment!", error);

            const message = error.response?.data?.error || "Failed to add appointment. Please try again.";
            setMessageText(message);
        
            setTimeout(() => {
            setMessageText("");
            }, 3000)
            } 
             
    };

     const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    const resetInfo=() =>{
        setValues({appointment_date: '', time: '', patient_id:'', doctor_id:'',status:'',})
      };


    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <h1 className='PageHeader'> Appointment Registration</h1>

            <button className="BackBtn" type="button" onClick={() => navigate('/Appointments')}><IoMdArrowRoundBack/>Back</button>

            <form onSubmit={handleSubmit} className="AddUpdateForm">
            
                <label htmlFor="appointment_date" >Appointment Date</label>
                <input type="date" placeholder='Enter appointment date'name='appointment_date' id='appointment_date'
                 onChange={(e)=> handleChanges(e)} 
                 required value={formatDateInput(values.appointment_date)}/>
                
                <label htmlFor="time" >Time</label>
                <input type="time" placeholder='Enter time' name='time' id='time'
                onChange={(e)=> handleChanges(e)} 
                required value={values.time}/>
          
                <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                value={values.patient_id}
                required
                >
                <option value="" disabled>Select Patient</option>
               {patients.map((patient)=>(
                <option key={patient.patient_id} value={patient.patient_id}>{patient.first_name} {patient.last_name}
                </option>
                ))}
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
               {doctors.map((doctor)=>(
                <option key={doctor.doctor_id} value={doctor.doctor_id}>{doctor.first_name} {doctor.last_name}
                </option>
                ))}
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
            {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}
        </div>

            </div>

    )
}
export default AddAppointments;