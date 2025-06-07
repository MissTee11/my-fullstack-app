import { FaBed } from "react-icons/fa";
import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { getAdmission, deleteAdmission } from "../api";
import { useState, useEffect } from "react";
import { formatDateInput } from '../utilities/DateFormat';
import './Pages.css';

function Admissions(){
  const[admissions, setAdmissions] = useState([]);
  const[messageText, setMessageText]= useState("");

  useEffect(()=>{
    const fetchAdmissions = async()=>{
     try{
        const res = await getAdmission();
        console.log("Fetched admissions data:", res.data); 
        setAdmissions(res.data);
        }
      catch(err){
          console.error("Failed to fetch admission records:", err);
        }
      };
        fetchAdmissions();
      }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this amdission record?")) {
          try {
                await deleteAdmission(id);
                setAdmissions(admissions.filter(a => a.admission_id !== id));
            
                setMessageText("Admission record deleted successfully!");
                setTimeout(() => setMessageText(""), 3000);
                }
                catch (err) {
                console.error("Error deleting admission:", err);
            
                setMessageText("Failed to delete admission record. Please try again.");
                setTimeout(() => setMessageText(""), 3000);
                }
                }
              };
    
    const columns =[
          {
            name: 'Admission ID',
            selector:row =>row.admission_id
          },
          {
            name: 'Patient ID',
            selector:row =>row.patient_id
          },
          {
            name: 'Room',
            selector:row =>row.room_number
          },
          {
            name: 'Admission Date',
            selector:row =>formatDateInput(row.admission_date)
          },
          {
            name: 'Discharge Date',
            selector:row =>formatDateInput(row.discharge_date)
          },
          {
            name: 'Actions',
            cell: row => (
              <div>
                <Link to={`/UpdateAdmission/${row.admission_id}`}>
                <button className="UpdateBtn"><FaPen/></button>
                </Link>
                <button onClick = {() =>handleDelete(row.admission_id)} className="DeleteBtn" ><MdDelete/></button>
              </div>
            ),
          },
      
        ];

      return(
        <div>
        <Sidebar/>
        <div className="MainContent">
        <Link to="/AddAdmissions">
        <button className="AddBtn " ><FaBed className="iconBtn"/> Admit Patient </button>
        </Link>
        
        <DataTable
        columns={columns}
        data={admissions}
        customStyles={customStyles}
        theme="myCustomTheme">
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
export default Admissions;