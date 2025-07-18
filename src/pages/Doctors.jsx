import Sidebar from '../components/Sidebar'
import DataTable from "react-data-table-component";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { getDoctors, deleteDoctor } from '../api';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useDispatch } from 'react-redux'
import { fetchDoctors } from '../redux/slices/doctorSlice';

function Doctors(){

  const[doctors, setDoctors] = useState([]);
  const[messageText, setMessageText]=useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchDoctors = async()=>{
      try{
          const res = await getDoctors();
          setDoctors(res.data);
        }
      catch(err){
          console.error("Failed to fetch doctors:", err);
          }
        };
        fetchDoctors();
      }, []);

  const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
          try {
          await deleteDoctor(id);
          setDoctors(doctors.filter(d => d.doctor_id !== id));
          dispatch(fetchDoctors());
  
          setMessageText("Doctor deleted successfully!");
          setTimeout(() => setMessageText(""), 3000);
          }
          catch (err) {
          console.error("Error deleting doctor:", err);
  
          setMessageText("Failed to delete doctor. Please try again.");
          setTimeout(() => setMessageText(""), 3000);
          }
        }
      };
      
    const columns =[
        {
          name: 'Doctor ID',
          selector:row =>row.doctor_id
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
            selector:row =>row.specialty_name
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
             <Link to={`/UpdateDoctor/${row.doctor_id}`}>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button onClick = {() =>handleDelete(row.doctor_id)} className="DeleteBtn" ><MdDelete/></button>
            </div>
          ),
        },
      ];

      
      const filteredDoctors = doctors.filter(doctor => {
        return (
          doctor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialty_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

    return(
        <div>
          <Sidebar/>
          
            <div className="MainContent">
              <h1 className='PageHeader'>Doctors</h1>
              <Link to="/AddDoctor">
              <button className="AddBtn" ><IoPersonAddSharp className="iconBtn"/> Register New Doctor </button>
              </Link>

              <SearchBar
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}
              placeholder='Search by Doctor Name or Specialty'
              />
      
                  <DataTable
                  columns={columns}
                  data={filteredDoctors}
                  theme="myCustomTheme"
                  customStyles={customStyles}
                  responsive
                    >
                  </DataTable>
            </div>

        {messageText && (
          <div className="popup">
          <p>{messageText}</p>
          </div>
        )}
           
        </div>

    );
}
export default Doctors;