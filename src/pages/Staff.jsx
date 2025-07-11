import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Sidebar from '../components/Sidebar';
import { IoPersonAddSharp } from "react-icons/io5";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { getStaff, deleteStaff } from "../api";
import { useState, useEffect } from "react";
import SearchBar from '../components/SearchBar';
import './Pages.css';

function Staff(){

  const[staff, setStaff]=useState([]);
  const[messageText, setMessageText]= useState("");
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=>{
      const fetchStaff = async()=>{
        try{
            const res = await getStaff();
            console.log("Fetched staff data:", res.data); 
            setStaff(res.data);
          }
        catch(err){
            console.error("Failed to fetch staff members:", err);
            }
          };
          fetchStaff();
        }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
          try {
            await deleteStaff(id);
            setStaff(staff.filter(s => s.staff_id !== id));
      
            setMessageText("Staff member deleted successfully!");
            setTimeout(() => setMessageText(""), 3000);
            }
            catch (err) {
            console.error("Error deleting staff member:", err);
      
            setMessageText("Failed to delete staff memmber. Please try again.");
            setTimeout(() => setMessageText(""), 3000);
            }
          }
        };
    
    const columns =[
        {
          name: 'Staff ID',
          selector:row =>row.staff_id
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
          name: 'Role',
          selector:row =>row.role_name
        },
        {
          name: 'Department',
          selector:row =>row.department_name
        },
        {
          name: 'Actions',
          cell: row => (
            <div >
            <Link to= {`/UpdateStaff/${row.staff_id}`}>
              <button className="UpdateBtn"><FaPen/></button>
              </Link>
            <button  onClick = {() =>handleDelete(row.staff_id)} className="DeleteBtn" ><MdDelete/></button>
         </div>
          ),
        },
    
      ];

       const filteredStaff = staff.filter(staff => {
        return (
          staff.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          staff.role_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });


    return(
        <div>

        <Sidebar/>
        <div className="MainContent">
          <Link to="/AddStaff">
          <button className="AddBtn " ><IoPersonAddSharp className="iconBtn"/> Register New Staff </button>
          </Link>

          <SearchBar
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            placeholder='Search by availability name or role'
            />
        
        <DataTable
        columns={columns}
        data={filteredStaff}
        customStyles={customStyles}
        theme="myCustomTheme"
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
    )
}
export default Staff;