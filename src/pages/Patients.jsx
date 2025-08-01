import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import { TbReportMedical } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../api'; 
import { formatDateInput } from "../utilities/DateFormat";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import SearchBar from '../components/SearchBar';
import { useDispatch } from 'react-redux'
import './Pages.css';
import { fetchPatients } from '../redux/slices/patientSlice';

function Patients(){

    const[patients, setPatients] = useState([]);
    const[messageText, setMessageText] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

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
        dispatch(fetchPatients());

        setMessageText("Patient deleted successfully!");
        setTimeout(() => setMessageText(""), 3000);
        }
        catch (err) {
        console.error("Error deleting patient:", err);

        setMessageText("Failed to delete patient. Please try again.");
        setTimeout(() => setMessageText(""), 3000);
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
          selector:row =>formatDateInput(row.date_of_birth)
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
              <Link to={`/MedicalRecord/${row.patient_id}`}>
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

      const filteredPatients = patients.filter(patient => {
        return (
          patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

    return(
    <div>

      <Sidebar/>
        <div className="MainContent">
          <h1 className='PageHeader'> Patients </h1>
          <Link to="/AddPatient">
            <button className="AddBtn " ><IoPersonAddSharp className="iconBtn"/> Register New Patient </button>
          </Link>

          <SearchBar
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          placeholder='Search by Name or City'
          />
            
        <DataTable
          columns={columns}
          data={filteredPatients}
          customStyles={customStyles}
          theme="myCustomTheme"
          responsive>
        </DataTable>
        </div>

        {messageText && (
          <div className="popup">
          <p>{messageText}</p>
          </div>
        )}

           
      </div>

    )
}
export default Patients;