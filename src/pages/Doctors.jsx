import Sidebar from '../components/Sidebar'
import DataTable, {createTheme} from "react-data-table-component";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Pages.css'

function Doctors(){

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
            <button className="UpdateBtn"><FaPen/></button>
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
              <Link to="/AddDoctor">
              <button className="AddBtn" ><IoPersonAddSharp className="iconBtn"/> Register New Doctor </button>
              </Link>
           
        
                  <DataTable
                  columns={columns}
                  data={columns}
                  theme="blue"
                  customStyles={customStyles}>
                  </DataTable>
            </div>
           

        </div>

    );
}
export default Doctors;