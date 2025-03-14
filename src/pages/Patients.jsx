import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import './Pages.css';

function Patients(){

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
          name: 'Patient ID',
          selector:row =>row.person_id
        },
        {
          name: 'First Name',
          selector:row =>row.first_name
        },
        {
          name: 'Last Name',
          selector:row =>row.last_name
        },
        {
          name: 'Date of Birth',
          selector:row =>row.date_of_birth
        },
        {
          name: 'Gender',
          selector:row =>row.gender
        },
        {
            name: 'Contact Number',
            selector:row =>row.contact_number
        },
        {
            name: 'City of Residence',
            selector:row =>row.city
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
                <Link to='/UpdatePatient'>
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
              <Link to="/AddPatient">
              <button className="AddBtn " ><IoPersonAddSharp className="iconBtn"/> Register New Patient </button>
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
export default Patients;