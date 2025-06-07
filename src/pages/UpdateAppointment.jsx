import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate,useParams } from 'react-router-dom';
import { formatDateInput } from '../utilities/DateFormat';
import { getSingleAppointment, getDoctors, getPatients, updateAppointment } from '../api';

function UpdateAppointments(){

    const statuses = ["Scheduled", "Completed", "Cancelled"];
    const[ patients, setPatients] = useState([]);
    const[doctors, setDoctors] = useState([]);
    const [messageText, setMessageText] = useState("");
  

    const navigate=useNavigate();
    const {id} = useParams();

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

            const singleAppointment= await getSingleAppointment(id);
            setValues(singleAppointment.data)
        }
        catch (err) {
            console.error("Error fetching data:", err);
            }
        };
        fetchData();
          },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await updateAppointment(id, values);
            setMessageText("Appointment updated successfully!");
        
            setTimeout(() => {
            setMessageText("");
            navigate('/Appointments');
            }, 3000)
        
            }
            catch(error){
            console.error("Error updating appointment!", error)
            setMessageText("Failed to update appointment. Please try again.");
        
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
        setValues({date: '', time: '', patient_id:'', doctor_id:'',status:'',})
      }


    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Appointment Update Form</h1>

            <form onSubmit={handleSubmit} className="DetailForm">
                <div>
                <label htmlFor="appointment_date" >Appointment Date</label>
                <input type="date" placeholder='Enter appointment date'name='appointment_date' id='appointment_date'
                 onChange={(e)=> handleChanges(e)} 
                 required 
                 value={formatDateInput(values.appointment_date)}/>
                </div>
                <div>
                <label htmlFor="time" >Time</label>
                <input type="time" placeholder='Enter time' name='time' id='time'
                onChange={(e)=> handleChanges(e)} 
                required 
                value={values.time}/>
                </div>
                <div>
                <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                required
                value={values.patient_id}
                >
                <option value="" disabled>Select Patient</option>
                {patients.map((patient)=>(
                <option key={patient.patient_id} value={patient.patient_id}>{patient.first_name} {patient.last_name}
                </option>
                ))}
                </select>
                </div>
                <div>
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
                <button className="SaveBtn"type="submit">Save Changes</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>
                </div>
                
            </form>
            {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}
        </div>

            </div>

        </div>
    )
}
export default UpdateAppointments;