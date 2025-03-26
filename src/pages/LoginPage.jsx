import './Pages.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';

function LoginPage(){
    return(
    
            <div className="LogIn">
            <h1>Login to Your Account</h1>

            <form className="LoginForm">
                
                <label htmlFor='profile'>Choose Profile</label>
                <select id='profile' name='profile'>
                    <option value='receptionist'>Receptionist</option>
                    <option value='doctor'>Doctor</option>
                    <option value='admin'>Administration</option>
                    
                </select>
                <input type='text' placeholder="Enter username"/>
                <input type='text' placeholder="Enter password"/>

                <Link to='/Dashboard' className="LoginBtn">
                Log In
                </Link>
                
            </form>

        </div>

        
    )
}
export default LoginPage;