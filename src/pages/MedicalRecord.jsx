import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5"
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";

function MedicalRecord(){

const [medicalRecords, setMedicalRecords] = useState([]);
const {id} = useParams();

  const columns = [
    {
      name: 'Record ID',
      selector: (row) => row.record_id,
    },
    {
      name: 'Appointment ID',
      selector: (row) => row.appointment_id,
    },
    {
      name: 'Doctor ID',
      selector: (row) => `${row.first_name} ${row.last_name}`
    },
    {
      name: 'Diagnosis',
      selector: (row) => row.diagnosis,
    },
    {
      name: 'Actions',
      cell: (row) => (
         <div >
              <Link to={`/UpdateRecord/${row.id}`}>
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
      data={medicalRecords}
      customStyles={customStyles}
      theme="myCustomTheme">
      </DataTable>
        </div>
       
    </div>
  );
}
export default MedicalRecord