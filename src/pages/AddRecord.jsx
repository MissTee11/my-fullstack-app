import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { createRecord, getDoctors, getSinglePatient, getAppointment} from '../api';

function AddRecord(){
    const navigate=useNavigate();
    const [values, setValues]=useState({
       
        patient_id:'',
        doctor_id:'',
        symptoms:'',
        diagnosis:'',
    });
     
  const [messageText, setMessageText] = useState("");
  const[ patients, setPatients] = useState([]);
  const[doctors, setDoctors] = useState([]);
  const[appointments, setAppointments] = useState([]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
    const resetInfo = () => {
        setValues({
        appointment_id:'',
        patient_id:'',
        doctor_id:'',
        symptoms:'',
        diagnosis:'',
        });
      };

      useEffect (()=>{
          const fetchData = async ()=>{
            try{
              const docRes= await getDoctors();
              setDoctors(docRes.data);
          
              const patientRes= await getSinglePatient(id);
              setPatients(patientRes.data);

              const appRes = await getAppointment();
              setAppointments(appRes.data)
              }
              catch (err) {
                console.error("Error fetching data:", err);
              }
            };
              fetchData();
            },[id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/MedicalRecord');
      };
    

return(
  <div>
    <Sidebar/>
    <div className="MainContent">
      
      <div className="Form">
        <h1>Medical Record</h1>
        <form onSubmit={handleSubmit} className="DetailForm">
        <div>
              <label htmlFor="patient_ID" >Patient_ID</label>
                <input type="text" 
                name='patient_ID' 
                id='patient_ID'
                value={values.patient_ID}
                readOnly
                />
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
                <label htmlFor="appointment_id">Select Appointment</label>
                <select
                name="appointment_id"
                id="appointment_id"
                onChange={handleChanges}
                value={values.appointment_id}
                required
                >
                <option value="" disabled>Select Appointment</option>
               {appointments.map((appointment)=>(
                <option key={appointment.appointment_id} value={appointment.appointment_id}>{appointment.appointment_date}
                </option>
                ))}
                </select>
                </div>
        <div>

          <label htmlFor="diagnosis">Diagnosis</label>
          <textarea
          id="diagnosis"
          name="diagnosis"
          value={values.diagnosis}
          onChange={(e) => handleChanges(e)}
          rows={20}
          cols={65}
            />
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
export default AddRecord;