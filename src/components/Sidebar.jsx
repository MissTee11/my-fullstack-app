import React from 'react'
import './Components.css'
import { RiDashboardLine, RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp, IoLogOut } from "react-icons/io5";
import { MdBedroomChild, MdOutlinePayment } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBed } from "react-icons/fa"
import { Link } from 'react-router-dom';


function Sidebar(){
   return(
    <div className="Sidebar">
        
        <div className="Profile">
            <IoPersonSharp className="ProfileImg"/>
            <h2>Admin</h2>
        </div>
        
        <ul className="sidebar-list">
            <li className="sidebar-item">
                <Link to='/Dashboard'>
                <RiDashboardLine className='icon'/> Dashboard
                </Link>
                 
            </li>
            <li className="sidebar-item">
                <Link to="/Doctors">
                    <FaUserDoctor className='icon'/> Doctors
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Patients">
                    <IoPersonSharp className='icon'/> Patients
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Staff">
                    <IoPersonSharp className='icon'/> General Staff 
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Appointments">
                    <RiCalendarScheduleFill className='icon'/> Appointments
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Admissions">
                    <FaBed className='icon'/> Admissions 
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Rooms">
                    <MdBedroomChild className='icon'/>Rooms 
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Payments">
                    <MdOutlinePayment className='icon'/> Payments
                </Link>
            </li>
        </ul>
        <Link to='/LoginPage'>
        <button className="LogoutBtn"><IoLogOut/>Log Out</button>
        </Link>
       
    </div>
   ) 
}

export default Sidebar;