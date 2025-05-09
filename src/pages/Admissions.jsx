import { FaBed } from "react-icons/fa";
import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { formatDateInput } from '../utilities/DateFormat';
import './Pages.css';

function Admissions(){

    const columns =[
        {
          name: 'Admission ID',
          selector:row =>row.admission_id
        },
        {
          name: 'Patient',
          selector:row =>row.patient_id
        },
        {
          name: 'Room',
          selector:row =>row.room_id
        },
        {
          name: 'Admission Date',
          selector:row =>formatDateInput(row.admission_date)
        },
        {
          name: 'Discharge Date',
          selector:row =>formatDateInput(row.discharge_date)
        },
        {
          name: 'Actions',
          cell: row => (
            <div>
              <Link to='/UpdateAdmission'>
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
        <Link to="/AddAdmissions">
        <button className="AddBtn " ><FaBed className="iconBtn"/> Admit Patient </button>
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
export default Admissions;