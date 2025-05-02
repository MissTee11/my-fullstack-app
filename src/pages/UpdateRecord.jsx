import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdateRecord(){
    const navigate=useNavigate();
    const [values, setValues]=useState({
        record_ID:'',
        appointment_ID:'',
        patient_ID:'',
        doctor_ID:'',
        diagnosis:'',
    });

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
              <label htmlFor="record_ID" >Record_ID</label>
                <input type="text" 
                name='record_ID' 
                id='record_ID'
                value={values.record_ID}
                readOnly
                />
        </div>
        <div>
              <label htmlFor="appointment_ID" >Appointment_ID</label>
                <input type="text" 
                name='appointment_ID' 
                id='appointment_ID'
                value={values.appointment_ID}
                readOnly
                />
        </div>
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
              <label htmlFor="doctor_ID" >Doctor_ID</label>
                <input type="text" 
                name='doctor_ID' 
                id='doctor_ID'
                value={values.appointment_ID}
                readOnly
                />
        </div>
        <div>
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
        </div>
       
        </form>

      </div>
     

    </div>

  </div>
  

 )
}
export default UpdateRecord;