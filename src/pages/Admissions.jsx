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
import SearchBar from '../components/SearchBar';
import './Pages.css';

function Admissions(){
  const[admissions, setAdmissions] = useState([]);
  const[messageText, setMessageText]= useState("");
  const [searchQuery, setSearchQuery] = useState('');

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
        if (window.confirm("Are you sure you want to delete this admission record?")) {
          try {
                await deleteAdmission(id);
                setAdmissions(admissions.filter(a => a.admission_id !== id));//triggers automatic UI update
            
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
            name: 'Patient Name',
           selector: (row) => `${row.first_name} ${row.last_name}`
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
            cell:row =>formatDateInput(row.discharge_date)|| "N/A",//selector is used for raw values, cell for formatting
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

         const filteredAdmissions = admissions.filter(admission => {
        return (
          admission.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          admission.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          admission.room_number.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });


      return(
        <div>
        <Sidebar/>
        <div className="MainContent">
          <h1 className='PageHeader'>Admissions</h1>
        <Link to="/AddAdmissions">
        <button className="AddBtn " ><FaBed className="iconBtn"/> Admit Patient </button>
        </Link>

         <SearchBar
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          placeholder='Search by Patient Name or Room Number'
          />
        
        <DataTable
        columns={columns}
        data={filteredAdmissions}
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