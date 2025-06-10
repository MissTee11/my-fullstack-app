import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState, useEffect} from "react";
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
    const [rooms, setRooms]= useState([]);

    useEffect(()=>{
     const fetchRooms = async () => {
                try {
                  const res = await getRooms();
                  console.log(res.data);
                  setRooms(res.data);
                   
                } catch (err) {
                  console.error("Error fetching specialty:", err);
                }
              };
              fetchRooms();
            }, []);
    
    

    const handleMakeAppointment= async (availability_status, event)=>{
      if (event) event.preventDefault();

        if(availability_status !=="Available"){
            setMessageText("ROOM IN USE");

            setTimeout(() => {
                setMessageText("");
            }, 3000)

        }
        else{
            navigate('/AddAdmissions');
        }

    }

    const columns =[
        {
          name: 'Room Number',
          selector:row =>row.room_number
        },
        {
          name: 'Room Type',
          selector:row =>row.room_type
        },
         {
          name: 'Availability Status',
          selector:row =>row.availability_status
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
              <button className="UpdateBtn" onClick={(e)=>handleMakeAppointment(row.availability_status,e)}><RiCalendarScheduleFill/>Admit Patient</button>
             
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
            data={rooms}
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