import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5"
import React,{useState,useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import './Pages.css';

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
            <Link to='/UpdateStaff'>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button className="DeleteBtn" ><MdDelete/></button>
         </div> 
      ),
    },
];

 createTheme(
                  'blue',
              {
                  text: {
                      primary: '#4C3BCF',
                  },
                  background: {
                      default: 'white',
                  },
                  context: {
                      background: '#cb4b16',
                      text: '#FFFFFF',
                  },
                  divider: {
                      default: '#3674B5',
                  },
                  sortFocus: {
                      default: '#2aa198',
                  },
                  
              },
              'dark',
              );

              const customStyles = {
                headCells: {
                  style: {
                    fontSize: '15px', 
                    fontWeight: 'bold',
                    color: '#3674B5',
                  },
                },
                cells: {
                  style: {
                    fontSize: '15px', 
                    color: '#3674B5',
                  },
                },
              };

return (
    <div>
        <Sidebar/>
        <div className="MainContent">
        <Link to={'/'}>
        <button className="AddBtn"><IoAddSharp/>Add Record</button>
        </Link>

      <DataTable
      columns={columns}
      data={medicalRecords}
      customStyles={customStyles}
      theme="blue">
      </DataTable>
        </div>
       
    </div>
  );
}
export default MedicalRecord