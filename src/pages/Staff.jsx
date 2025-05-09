import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import './Pages.css';

function Staff(){
    
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
        theme="myCustomTheme">
        </DataTable>
        </div>
       
    </div>
    )
}
export default Staff;