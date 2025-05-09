import Sidebar from '../components/Sidebar'
import DataTable from "react-data-table-component";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";

function Doctors(){

    const columns =[
        {
          name: 'Doctor ID',
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
          name: 'Gender',
          selector:row =>row.gender
        },
        {
            name: 'Specialty',
            selector:row =>row.specialty
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
             <Link to='/UpdateDoctor'>
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
              <Link to="/AddDoctor">
              <button className="AddBtn" ><IoPersonAddSharp className="iconBtn"/> Register New Doctor </button>
              </Link>
           
        
                  <DataTable
                  columns={columns}
                  data={columns}
                  theme="myCustomTheme"
                  customStyles={customStyles}
                  responsive
                    >
                  </DataTable>
            </div>
           

        </div>

    );
}
export default Doctors;