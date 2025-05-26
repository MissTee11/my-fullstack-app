import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { createStaff, getDepartments, getRoles } from '../api';

function AddStaff(){

  const navigate = useNavigate();
  const[roles, setRoles]= useState([]);
  const[department, setDepartment] = useState([]);
  const[messageText, setMessageText]=useState([]);

  const [values, setValues] = useState({
      first_name: '',
      last_name: '',
      gender: '',
      department: '',
      role_name: '',
    });

  useEffect (()=>{
    const fetchData = async ()=>{
      try{
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
  },[]);
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          await createStaff(values);
          setMessageText("Staff member added successfuly!");
      
          setTimeout(()=>{
          setMessageText("");
          navigate('/Staff');
          }, 3000);
          }
          catch(error){
          console.error("Error adding staff member", error);
          setMessageText("Failed to add staff member.Please try again.");
      
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
      setValues({first_name: '', last_name: '',gender:'', department:'', role_name:'',})
    }

    return(
    <div>
             <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Staff Registration</h1>

            <form onSubmit={handleSubmit} className="DetailForm">
              <div>
              <label htmlFor="first_name" >Name</label>
                <input type="text" placeholder='Enter staff first name'name='first_name' id='first_name'
                 onChange={(e)=> handleChanges(e)} 
                 required
                  value={values.first_name}/>
              </div>

              <div>
              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name' id='last_name'
                onChange={(e)=> handleChanges(e)}
                 required 
                 value={values.last_name}/>
              </div>

              <div>
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
              </div>

              <div>
              <label htmlFor="department">Select Department</label>
                <select
                name="department"
                id="department"
                onChange={handleChanges}
                required>
                <option value="" disabled>Select Department</option>
                {department.map((department)=>(
                  <option key={department.id} value={department.id}>{department.department}
                  </option>
                ))}
                </select>
              </div>

              <div>
              <label htmlFor="role" >Role</label>
                <select 
                name="role" 
                id="role" 
                onChange={(e) => handleChanges(e)} 
                required>
               {roles.map((roles)=>(
                  <option key={roles.id} value={roles.id}>{roles.role_name}
                  </option>
                ))}
                </select>

                <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
              </div>
              
              </div>
            </form> 

            {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}

        </div>
       
         </div>

    </div>
    )
}
export default AddStaff;