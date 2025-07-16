import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import { getSingleStaff, getRoles, getDepartments,updateStaff } from '../api';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { fetchStaff } from '../redux/slices/staffSlice';

function UpdateStaff(){

  const navigate = useNavigate();
  const {id} = useParams();
  const[roles, setRoles]=useState([]);
  const[department, setDepartment]=useState([]);
  const [messageText,setMessageText]=useState("");
   const dispatch = useDispatch();

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        department_id: '',
        role_id: '',
      });

    useEffect (()=>{
        const fetchData = async ()=>{
          try{
            const staffRes= await getSingleStaff(id);
            setValues(staffRes.data);

            const roleRes= await getRoles();
            setRoles(roleRes.data);
    
            const departmentRes= await getDepartments();
            setDepartment(departmentRes.data);
          }
          catch (err) {
            console.error("Error fetching data:", err);
          }
        };
        fetchData();
      },[id]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      try{
          await updateStaff(id, values);
          dispatch(fetchStaff());
          setMessageText("Staff member updates successfuly!");
      
          setTimeout(()=>{
          setMessageText("");
          navigate('/Staff');
          }, 3000);
          }
          catch(error){
          console.error("Error updating staff member", error);
          setMessageText("Failed to update staff member.Please try again.");
      
          setTimeout(()=>{
          setMessageText("");
          }, 3000)
          } 
    };
      
    
      const handleChanges = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
     };
        const resetInfo=() =>{
            setValues({first_name: '', last_name: '',gender:'', department_id:'', role_id:'',})
          }

    return(
    <div>
             <Sidebar/>
            <div className="MainContent">
            <h1 className='PageHeader'> Staff Update Form</h1>

            <button className="BackBtn" type="button" onClick={() => navigate('/Staff')}><IoMdArrowRoundBack/>Back</button>
            
            <form onSubmit={handleSubmit} className="AddUpdateForm">
             
              <label htmlFor="first_name" >Name</label>
                <input type="text" placeholder='Enter staff first name'name='first_name' id='first_name'
                 onChange={(e)=> handleChanges(e)} 
                 required
                  value={values.first_name}/>
            
              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name' id='last_name'
                onChange={(e)=> handleChanges(e)}
                 required 
                 value={values.last_name}/>
              
              <label htmlFor="gender" >Gender</label>
                <select name='gender'
                id='gender'
                onChange={(e)=> handleChanges(e)}
                required 
                value={values.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
              
              <label htmlFor="department_id">Select Department</label>
                <select
                name="department_id"
                id="department_id"
                value={values.department_id}
                onChange={handleChanges}
                required>
                <option value="" disabled>Select Department</option>
                {department.map((department)=>(
                  <option key={department.id} value={department.id}>{department.department}
                  </option>
                ))}
                </select>
              
              <label htmlFor="role_id" >Role</label>
                <select 
                name="role_id" 
                id="role_id"
                value={values.role_id}
                onChange={(e) => handleChanges(e)} 
                required >
                <option value="" disabled>Select role</option>
                {roles.map((roles)=>(
                  <option key={roles.id} value={roles.id}>{roles.role_name}
                  </option>
                ))}
                </select>
                <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
              </div>
            </form>

             {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}
            
         </div>
        </div>
        
    )
}
export default UpdateStaff;