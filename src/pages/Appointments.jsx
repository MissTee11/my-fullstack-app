import {RiCalendarScheduleFill } from "react-icons/ri";
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { formatDateInput } from '../utilities/DateFormat';
import { getAppointment, deleteAppointment } from "../api";
import { useState, useEffect } from "react";
import './Pages.css';

function Appointments(){

  const[appointments, setAppointments]= useState([]);
  const[messageText, setMessageText]= useState("");

  useEffect(()=>{
      const fetchAppointments = async()=>{
        try{
          const res = await getAppointment();
          console.log("Fetched appointment data:", res.data); 
          setAppointments(res.data);
        }
        catch(err){
          console.error("Failed to fetch appointment:", err);
        }
      };
        fetchAppointments();
      }, []);

  const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this appointment?")) {
        try {
              await deleteAppointment(id);
              setAppointments(appointments.filter(a => a.appointment_id !== id));
          
              setMessageText("Appointment deleted successfully!");
              setTimeout(() => setMessageText(""), 3000);
              }
              catch (err) {
              console.error("Error deleting appointment:", err);
          
              setMessageText("Failed to delete appointment. Please try again.");
              setTimeout(() => setMessageText(""), 3000);
              }
              }
            };

 
    const columns =[
        {
          name: 'Appointment ID',
          selector:row =>row.appointment_id
        },
        {
          name: 'Patient ID',
          selector:row =>row.patient_id
        },
        {
          name: 'Doctor ID',
          selector:row =>row.doctor_id
        },
        {
          name: 'Appointment Date',
          selector:row =>formatDateInput(row.appointment_date)
        },
        {
          name: 'Time',
          selector:row =>row.time
        },
        {
            name: 'Status',
            selector:row =>row.status
        },
        {
          name: 'Actions',
          cell: row => (
        <div >
            <Link to={`/UpdateAppointment/${row.appointment_id}`}>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button onClick = {() =>handleDelete(row.appointment_id)} className="DeleteBtn" ><MdDelete/></button>
        </div>
          ),
        },
    
      ];

      return(
        <div>
        <Sidebar/>
        <div className="MainContent">
          <Link to="/AddAppointment">
          <button className="AddBtn " ><RiCalendarScheduleFill className="iconBtn"/> Make Appointment </button>
          </Link>
      
        <DataTable
        columns={columns}
        data={appointments}
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
export default Appointments