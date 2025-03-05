import { FaBed } from "react-icons/fa";
import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import './Pages.css';

function Admissions(){
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
          selector:row =>row.admission_date
        },
        {
          name: 'Discharge Date',
          selector:row =>row.discharge_date
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
        <Link to="/AddAdmissions">
        <button className="AddBtn " ><FaBed className="iconBtn"/> Admit Patient </button>
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
export default Admissions;