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
            <h1>Admission Registration</h1>
            <form onSubmit={handleSubmit}>
           
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

                <label htmlFor="admission_date">Admission Date</label>
                <input type="date" placeholder="Enter Admission Date"name="admission_date"
                onChange={(e) => handleChanges(e)}
                required
                value={values.admission_date}
                />

                <label htmlFor="discharge_date">Discharge Date</label>
                <input type="date" placeholder="Enter Discharge Date" name="discharge_date"
                onChange={(e) => handleChanges(e)}
                value={values.discharge_date}
                />

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