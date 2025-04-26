import './Pages.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';

function LoginPage(){
    return(
    
            <div className="LogIn">
            <form className="LoginForm">
                <h1>LogIn</h1>
                <label htmlFor='profile' className="profile">ADMIN PANEL LOGIN</label>
                <input type='text' placeholder="Enter username"/>
                <input type='text' placeholder="Enter password"/>

                <Link to='/Dashboard' className="LoginBtn">
                LOGIN
                </Link>
                
            </form>

        </div>

        
    )
}
export default LoginPage;