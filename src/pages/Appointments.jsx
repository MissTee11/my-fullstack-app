import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { formatDateInput } from '../utilities/DateFormat';
import './Pages.css';

function Appointments(){

 
    const columns =[
        {
          name: 'Appointment ID',
          selector:row =>row.appointment_id
        },
        {
          name: 'Patient ID',
          selector:row =>row.patient_name
        },
        {
          name: 'Doctor ID',
          selector:row =>row.doctor_name
        },
        {
          name: 'Appointment Date',
          selector:row =>formatDateInput(row.appointment_date)
        },
        {
          name: 'Time',
          selector:row =>row.time
        },
        {
            name: 'Status',
            selector:row =>row.status
        },
        {
          name: 'Actions',
          cell: row => (
        <div >
            <Link to='/UpdateAppointment'>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button className="DeleteBtn" ><MdDelete/></button>
        </div>
          ),
        },
    
      ];

      return(
        <div>
        <Sidebar/>
        <div className="MainContent">
          <Link to="/AddAppointment">
          <button className="AddBtn " ><RiCalendarScheduleFill className="iconBtn"/> Make Appointment </button>
          </Link>
      
        <DataTable
        columns={columns}
        data={columns}
        customStyles={customStyles}
        theme="myCustomTheme">
        </DataTable>
        </div>
       
    </div>
      )

}
export default Appointments