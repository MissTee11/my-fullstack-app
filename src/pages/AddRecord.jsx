import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { createRecord, getDoctors, getSinglePatient} from '../api';
import { formatDateInput } from '../utilities/DateFormat';

function AddRecord(){
    const navigate=useNavigate();
    const [values, setValues]=useState({
      doctor_id: "",
      date: "",
      diagnosis: "",
      patient_id: "",
    });
     
  const [messageText, setMessageText] = useState("");
  const[ patients, setPatients] = useState([]);
  const[doctors, setDoctors] = useState([]);
  const {id} = useParams();

    const resetInfo = () => {
        setValues({
        doctor_id:'',
        date:'',
        diagnosis:'',
        patient_id:''
        });
      };

      useEffect (()=>{
          const fetchData = async ()=>{
            try{
              const docRes= await getDoctors();
              setDoctors(docRes.data);
          
              const patientRes= await getSinglePatient(id);
              setValues(patientRes.data);

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
        await createRecord(values);
        setMessageText("Medical record added successfully!");
           
        setTimeout(() => {
        setMessageText("");
       navigate(`/MedicalRecord/${values.patient_id}`);
        }, 3000)
           
        }
        catch(error){
        console.error("Error adding medical record!", error);

        const message = error.response?.data?.error || "Failed to add medical record. Please try again.";
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

return(
  <div>
    <Sidebar/>
    <div className="MainContent">
      
        <h1 className='PageHeader'>Medical Record</h1>
        <form onSubmit={handleSubmit} className="AddUpdateForm">
    
              <label htmlFor="patient_id" >Patient_id</label>
                <input type="text" 
                name='patient_id' 
                id='patient_id'
                value={values.patient_id}
                readOnly
                />
        
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
          
                <label htmlFor="date" >Select Date</label>
                <input type="date" placeholder='Select date'name='date' id='date'
                onChange={(e)=> handleChanges(e)} 
                value={formatDateInput(values.date)}
                required />

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
export default AddRecord;