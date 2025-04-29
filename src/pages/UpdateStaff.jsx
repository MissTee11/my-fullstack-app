import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdateStaff(){

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        department: '',
        role: '',
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        Navigate('/Staff')
    };
      
    
      const handleChanges = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
     };
        const resetInfo=() =>{
            setValues({first_name: '', last_name: '',gender:'', department:'', role:'',})
          }

    return(
    <div>
             <Sidebar/>
            <div className="MainContent">
            <div className="Form">
            <h1> Staff Update Form</h1>
            <form onSubmit={handleSubmit} className="DetailForm">
              <div>
              <label htmlFor="first_name" >Name</label>
                <input type="text" placeholder='Enter staff first name'name='first_name' 
                 onChange={(e)=> handleChanges(e)} 
                 required
                  value={values.first_name}/>
              </div>
              <div>
              <label htmlFor="last_name" >Last Name</label>
                <input type="text" placeholder='Enter last name' name='last_name'
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
                required
                value={values.department}
                >
                <option value="" disabled>Select Department</option>
                <option>Eye Diseases</option>
                <option>Heart Diseases</option>
                </select>
              </div>
              <div>
              <label htmlFor="role" >Role</label>
                <select 
                name="role" 
                id="role" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.role}>

                <option value="" disabled>Select role</option>
                <option value="Nurse"></option>
                <option value="Receptionist"></option>
                <option value="Guard"></option>
                </select>
              </div>
              <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
              </div>
            </form>
            
         </div>
        </div>
        

    </div>
    )
}
export default UpdateStaff;