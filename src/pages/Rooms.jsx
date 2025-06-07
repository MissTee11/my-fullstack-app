import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState} from "react";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Sidebar from '../components/Sidebar';
import {  useNavigate } from 'react-router-dom';
import './Pages.css';
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { getRooms } from "../api";
function Rooms(){
    const [messageText, setMessageText] =useState("");
    const navigate = useNavigate();

    const handleMakeAppointment= async (availability_status, event)=>{
      if (event) event.preventDefault();
      
        if(availability_status !=="available"){
            setMessageText("ROOM IN USE");

            setTimeout(() => {
                setMessageText("");
            }, 3000)

        }
        else{
            navigate('/Appointments');
        }

    }

    const columns =[
        {
          name: 'Room Number',
          selector:row =>row.room_number
        },
        {
          name: 'Availability Status',
          selector:row =>row.availability_status
        },
        {
          name: 'Room Type',
          selector:row =>row.room_type
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
              <Link to='/AddAppointment'>
              <button className="UpdateBtn" onClick={(e)=>handleMakeAppointment(row.availability_status,e)}><RiCalendarScheduleFill/>Make Appointment</button>
              </Link>
             
         </div>
          ),
        },
    
      ];

    return(
        <div>
            <Sidebar/>
             <div className="MainContent">          
            <DataTable
            columns={columns}
            data={columns}
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
       
    );
}
export default Rooms;