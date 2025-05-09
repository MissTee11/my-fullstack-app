import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5"
import React,{useState,useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";

function MedicalRecord(){

const [medicalRecords, setMedicalRecords] = useState([]);

  const columns = [
    {
      name: 'Record ID',
      selector: (row) => row.record_ID,
    },
    {
      name: 'Appointment ID',
      selector: (row) => row.appointment_ID,
    },
    {
      name: 'Patient ID',
      selector: (row) => row.patient_ID,
    },
    {
      name: 'Doctor ID',
      selector: (row) => row.doctor_ID,
    },
    {
      name: 'Diagnosis',
      selector: (row) => row.diagnosis,
    },
    {
      name: 'Actions',
      cell: (row) => (
         <div >
              <Link to='/UpdateRecord'>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button className="DeleteBtn" ><MdDelete/></button>
         </div> 
      ),
    },
];

return (
    <div>
        <Sidebar/>
        <div className="MainContent">

      <DataTable
      columns={columns}
      data={columns}
      customStyles={customStyles}
      theme="myCustomTheme">
      </DataTable>
        </div>
       
    </div>
  );
}
export default MedicalRecord