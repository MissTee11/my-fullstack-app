import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { formatDateInput } from '../utilities/DateFormat';
import { createAdmission, getPatients, getRooms } from '../api';

function AddAdmissions(){

  const navigate= useNavigate();
  const [messageText, setMessageText] = useState("");
  const[patients, setPatients] =([]);
  const[rooms, setRooms]=([]);

  const [values, setValues] = useState({
    patient_id: '',
    room_id: '',
    admission_date: '',
    discharge_date: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetInfo = () => {
    setValues({
      patient_id: '', room_id: '', admission_date: '',discharge_date: '',});
  };

  useEffect (()=>{
    const fetchData = async ()=>{
        try{
            const roomRes= await getRooms();
            setRooms(roomRes.data);
      
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
        await createAdmission(values);
        setMessageText("Admission record added successfully!");
           
        setTimeout(() => {
        setMessageText("");
        navigate('/Admissions');
        }, 3000)
           
        }
        catch(error){
        console.error("Error adding admission record!", error)
        setMessageText("Failed to add admission. Please try again.");
           
        setTimeout(() => {
        setMessageText("");
        }, 3000)
        } 
                
  };

    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1>Admission Registration</h1>
            <form onSubmit={handleSubmit} className="DetailForm">
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
              <label htmlFor="room_id">Select Room</label>
              <select
              name="room_id"
              id="room_id"
              onChange={handleChanges}
              required
              value={values.room_id}
              >
              <option value="" disabled>Select Room</option>
              {rooms.map((room)=>(
              <option key={room.id} value={room.id}>{room.room_number} {room.room_type}</option>
              ))}
              </select>
              </div>

              <div>
              <label htmlFor="admission_date">Admission Date</label>
                <input type="date" placeholder="Enter Admission Date"name="admission_date" id="admission_date"
                onChange={(e) => handleChanges(e)}
                required
                value={formatDateInput(values.admission_date)}
                />
              </div>
              <div>
              <label htmlFor="discharge_date">Discharge Date</label>
                <input type="date" placeholder="Enter Discharge Date" name="discharge_date" id="discharge_date"
                onChange={(e) => handleChanges(e)}
                value={formatDateInput(values.discharge_date)}
                />
              </div>
              <div className="Buttons">
                <button className="SaveBtn"type="submit">Save </button>
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

        </div>
    )
}
export default AddAdmissions;