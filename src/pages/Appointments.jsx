import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import './Pages.css';

function Appointments(){

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
          selector:row =>row.appointment_date
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
        theme="blue">
        </DataTable>
        </div>
       
    </div>
      )

}
export default Appointments