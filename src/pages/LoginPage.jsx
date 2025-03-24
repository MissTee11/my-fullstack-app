import './Pages.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';

function LoginPage(){
    return(
    
            <div className="LogIn">
            <h1>Login to Your Account</h1>
            <p id="User">Select User Profile</p>

            <div className="Profiles">
                <div className="Card">
                <RiAdminFill />
                <p>Admin</p>
                </div>

                <div className="Card">
                <FaUserDoctor />
                <p>Doctor</p>
                </div>

                <div className="Card">
                <IoPerson />
                <p>Receptionist</p>
                </div>

            </div>
            <form className="LoginForm">
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