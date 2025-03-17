import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState} from "react";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Sidebar from '../components/Sidebar';
import {  useNavigate } from 'react-router-dom';
import './Pages.css';


function Rooms(){
    const [messageText, setMessageText] =useState("");
    const navigate = useNavigate();

    const handleMakeAppointment= async (availability_status, event)=>{
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

    createTheme(
        'blue',
    {
        text: {
            primary: '#4C3BCF',
        },
        background: {
            default: 'white',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#3674B5',
        },
        sortFocus: {
            default: '#2aa198',
        },
        
    },
    'dark',
    );

    const columns =[
        {
          name: 'Room ID',
          selector:row =>row.room_id
        },
        {
          name: 'Availability Status',
          selector:row =>row.availability_status
        },
        {
          name: 'Department',
          selector:row =>row.department_name
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
              <button className="UpdateBtn" onClick={(e)=>handleMakeAppointment(row.availability_status,e)}><RiCalendarScheduleFill/>Make Appointment</button>
         </div>
          ),
        },
    
      ];
      const customStyles = {
        headCells: {
          style: {
            fontSize: '15px', 
            fontWeight: 'bold',
            color: '#3674B5',
          },
        },
        cells: {
          style: {
            fontSize: '15px', 
            color: '#3674B5',
          },
        },
      };

    return(
        <div>
            <Sidebar/>
             <div className="MainContent">          
            <DataTable
            columns={columns}
            data={columns}
            customStyles={customStyles}
            theme="blue">
              
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