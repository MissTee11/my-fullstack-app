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

function Doctors(){

  const[doctors, setDoctors] = useState([]);
  const[messageText, setMessageText]=("");

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
                  data={doctors}
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