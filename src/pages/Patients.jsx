import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import { TbReportMedical } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../api'; 

import './Pages.css';

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

function Patients(){

    const[patients, setPatients] = useState([]);

    useEffect(()=>{
      const fetchPatients = async()=>{
        try{
          const res = await getPatients();
          setPatients(res.data);
        }
        catch(err){
          console.error("Failed to fetch patients:", err);
        }
      };
      fetchPatients();
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this patient?")) {
        try {
          await deletePatient(id);
          setPatients(patients.filter(p => p.patient_id !== id));
        } catch (err) {
          console.error("Error deleting patient:", err);
        }
      }
    };
    
     
    const columns =[
        {
          name: 'Patient ID',
          selector:row =>row.patient_id
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
              <Link to='/MedicalRecord'>
              <button className="UpdateBtn"><TbReportMedical/></button>
              </Link>

                <Link to={`/UpdatePatient/${row.patient_id}`}>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>

              <button className="DeleteBtn"  onClick={() => handleDelete(row.patient_id)}>
              <MdDelete/></button>
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
            data={patients}
            customStyles={customStyles}
            theme="blue"
            responsive>
            </DataTable>
            </div>
           
        </div>

    )
}
export default Patients;