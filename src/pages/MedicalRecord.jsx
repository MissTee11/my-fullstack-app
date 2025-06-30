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
import { getMedicalRecord } from '../api';

function MedicalRecord(){

const [medicalRecords, setMedicalRecords] = useState([]);
const[messageText, setMessageText]= useState("");
const {id} = useParams();

 useEffect(()=>{
      const fetchMedicalRecords = async()=>{
       try{
          const res = await getMedicalRecord();
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
              await deletePayment(id);
              setPayments(payments.filter(p => p.payment_id !== id));
                    
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
      name: 'Appointment ID',
      selector: (row) => row.appointment_id,
    },
    {
      name: 'Doctor ID',
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
           <button onClick = {() =>handleDelete(row.payment_id)} className="DeleteBtn" ><MdDelete/></button>
         </div> 
      ),
    },
];

return (
    <div>
        <Sidebar/>
        <div className="MainContent">
        <Link to={`/AddRecord/${id}`}>
        <button className="AddBtn"><IoMdAdd />Record New Payment </button>
        </Link>

      <DataTable
      columns={columns}
      data={medicalRecords}
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