import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { formatDateInput } from '../utilities/DateFormat';

function AddAdmissions(){

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
            <h1>Admission Registration</h1>
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
                        <option>John</option>
                        <option>Mary</option>
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
                        <option>A1</option>
                        <option>A2</option>
                        <option>A3</option>
                        <option>A4</option>
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
            </div>   
            </div>

        </div>
    )
}
export default AddAdmissions;