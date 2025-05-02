import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdateAdmissions(){

    const navigate= useNavigate();
  const [values, setValues] = useState({
    patient_ID: '',
    room_ID: '',
    admission_date: '',
    discharge_date: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetInfo = () => {
    setValues({
      patient_ID: '',
      room_ID: '',
      admission_date: '',
      discharge_date: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/Admissions');
  };

    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1>Admission Update Form</h1>
            <form onSubmit={handleSubmit} className="DetailForm">
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
                        <option value="john">John</option>
                        <option value="mary">Mary</option>
                        </select>
              </div>
              <div>
              <label htmlFor="room_ID">Select Room</label>
                        <select
                        name="room_ID"
                        id="room_ID"
                        onChange={handleChanges}
                        required
                        value={values.room_ID}
                        >
                        <option value="" disabled>Select Room</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                        </select>
              </div>
              <div>
              <label htmlFor="admission_date">Admission Date</label>
                <input type="date" placeholder="Enter Admission Date"name="admission_date" id='admission_date'
                onChange={(e) => handleChanges(e)}
                required
                value={values.admission_date}
                />
              </div>
              <div>
              <label htmlFor="discharge_date">Discharge Date</label>
                <input type="date" placeholder="Enter Discharge Date" name="discharge_date" id='discharge_date'
                onChange={(e) => handleChanges(e)}
                value={values.discharge_date}
                />
              </div>
              <div className="Buttons">
                <button className="SaveBtn"type="submit">Save Changes </button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
            </div>
            </form>
            </div>
           
            </div>

        </div>
    )
}
export default UpdateAdmissions;