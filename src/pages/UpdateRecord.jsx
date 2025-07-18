import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import { getSingleRecord, updateRecord } from '../api';
import { formatDateInput } from '../utilities/DateFormat';
import { IoMdArrowRoundBack } from "react-icons/io";

function UpdateRecord(){
    const navigate=useNavigate();
    const [messageText, setMessageText] = useState("");
    const [values, setValues]=useState({
        record_id:'',
        doctor_id:'',
        diagnosis:'',
        date:'',
        patient_id:''
    });
    const {id} = useParams();


 useEffect(()=>{
      const fetchRecords = async()=>{
        try{
          const res = await getSingleRecord(id);
          setValues(res.data);
        }
        catch(err){
          console.error("Failed to fetch record:", err);
        }
      };
      fetchRecords();
    }, [id]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };
    const resetInfo = () => {
        setValues({
          diagnosis:'',
        });
      };
      const handleSubmit = async (e) => {
             e.preventDefault();
              try{
             await updateRecord(id, values);
             setMessageText("Medical record updated successfully!");
                
             setTimeout(() => {
             setMessageText("");
            navigate(`/MedicalRecord/${values.patient_id}`);
             }, 3000)
                
             }
             catch(error){
             console.error("Error updating medical record!", error);
     
             const message = error.response?.data?.error || "Failed to update medical record. Please try again.";
             setMessageText(message);
             
                
             setTimeout(() => {
             setMessageText("");
             }, 3000)
             }     
           };
    

return(
  <div>
    <Sidebar/>
    <div className="MainContent">
      
        <h1 className='PageHeader'> Medical Record Update Form</h1>

        <button className="BackBtn" type="button" onClick={() => navigate(`/MedicalRecord/${values.patient_id}`)}><IoMdArrowRoundBack/>Back</button>

        <form onSubmit={handleSubmit} className="AddUpdateForm">
        
              <label htmlFor="record_id" >Record_ID</label>
                <input type="text" 
                name='record_id' 
                id='record_id'
                value={values.record_id}
                readOnly
                />
        
              <label htmlFor="date" >Date</label>
                <input type="date" 
                name='date' 
                id='date'
                value={formatDateInput(values.date)}
                readOnly
                />
        
              <label htmlFor="patient_id" >Patient ID</label>
                <input type="text" 
                name='patient_id' 
                id='patient_id'
                value={values.patient_id}
                readOnly
                />
        
              <label htmlFor="doctor_id" >Doctor_ID</label>
                <input type="text" 
                name='doctor_id' 
                id='doctor_id'
                value={values.doctor_id}
                readOnly
                />
    
          <label htmlFor="diagnosis">Diagnosis</label>
          <textarea
          id="diagnosis"
          name="diagnosis"
          value={values.diagnosis}
          onChange={(e) => handleChanges(e)}
          rows={20}
          cols={75}
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
export default UpdateRecord;