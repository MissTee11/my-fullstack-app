import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import './Pages.css';

function Staff(){
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
          name: 'Staff ID',
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
          name: 'Role',
          selector:row =>row.roles
        },
        {
          name: 'Department',
          selector:row =>row.department
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
            <Link to='/UpdateStaff'>
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
          <Link to="/AddStaff">
          <button className="AddBtn " ><IoPersonAddSharp className="iconBtn"/> Register New Staff </button>
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
export default Staff;