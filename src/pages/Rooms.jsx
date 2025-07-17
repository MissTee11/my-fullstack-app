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
import SearchBar from '../components/SearchBar';
function Rooms(){

    const [messageText, setMessageText] =useState("");
    const navigate = useNavigate();
    const [rooms, setRooms]= useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    

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
    
    

    const handleMakeAdmission= async (availability_status,room_type, event,row)=>{
      if (event) event.preventDefault();

        if(availability_status !=="Available"){
            setMessageText("ROOM IN USE");

            setTimeout(() => {
                setMessageText("");
            }, 3000)

        }
        else if(room_type !== "General" && room_type !== "Private"){
          setMessageText("Admissions only allowed to general or private rooms");

            setTimeout(() => {
                setMessageText("");
            }, 3000)

        }
        else{
            navigate(`/AddAdmissions/${row.room_number}`);
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
              <button className="UpdateBtn" onClick={(e)=>handleMakeAdmission(row.availability_status,row.room_type, e, row)}><RiCalendarScheduleFill/>Admit Patient</button>
             
         </div>
          ),
        },
    
      ];

       const filteredRooms = rooms.filter(room => {
        return (
          room.availability_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.room_type.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
      });


    return(
        <div>
            <Sidebar/>
             <div className="MainContent"> 
              <h1 className='PageHeader'>Rooms</h1>

            <SearchBar
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            placeholder='Search by availability status or room type'
            />

                  
            <DataTable
            columns={columns}
            data={filteredRooms}
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