import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5"
import React,{useState,useEffect} from 'react';
import { IoMdAdd } from "react-icons/io";
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { getMedicalRecord, deleteRecord } from '../api';
import { formatDateInput } from "../utilities/DateFormat";
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchBar from '../components/SearchBar';

function MedicalRecord(){

const [medicalRecords, setMedicalRecords] = useState([]);
const[messageText, setMessageText]= useState("");
const [searchQuery, setSearchQuery] = useState('');
const {id} = useParams();

 useEffect(()=>{
      const fetchMedicalRecords = async()=>{
       try{
          const res = await getMedicalRecord(id);
          console.log("Fetched record data:", res.data); 
          setMedicalRecords(res.data);
          }
        catch(err){
            console.error("Failed to fetch medical records:", err);
          }
        };
          fetchMedicalRecords();
    }, [id]);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this medical record?")) {
        try {
              await deleteRecord(id);
              setMedicalRecords(medicalRecords.filter(m => m.record_id !== id));
                    
              setMessageText("Medical record deleted successfully!");
              setTimeout(() => setMessageText(""), 3000);
              }
              catch (err) {
              console.error("Error deleting medical record:", err);
                    
              setMessageText("Failed to delete medical record. Please try again.");
              setTimeout(() => setMessageText(""), 3000);
              }
              }
          };

  const columns = [
    {
      name: 'Record ID',
      selector: (row) => row.record_id,
    },
    {
      name: 'Date',
       selector:row =>formatDateInput(row.date)
    },
    {
      name: 'Doctor',
      selector: (row) => `${row.first_name} ${row.last_name}`
    },
    {
      name: 'Diagnosis',
      selector: (row) => row.diagnosis,
    },
    {
      name: 'Actions',
      cell: (row) => (
         <div >
              <Link to={`/UpdateRecord/${row.record_id}`}>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
           <button onClick = {() =>handleDelete(row.record_id)} className="DeleteBtn" ><MdDelete/></button>
         </div> 
      ),
    },
];

 const filteredMedicalRecord = medicalRecords.filter(medicalRecord => {
        return (
          medicalRecord.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicalRecord.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicalRecord.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });


return (
    <div>
        <Sidebar/>
        <div className="MainContent">
        <Link to={'/Patients'}>
        <button className="BackBtn"><IoMdArrowRoundBack/>Back </button>
        </Link>
        <Link to={`/AddRecord/${id}`}>
        <button className="AddBtn"><IoMdAdd />Add Medical Record </button>
        </Link>
        
        <SearchBar
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}
              placeholder='Search by Doctor Name or Diagnosis'
          />


      <DataTable
      columns={columns}
      data={filteredMedicalRecord}
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
  );
}
export default MedicalRecord