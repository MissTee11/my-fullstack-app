import React from 'react'
import './Components.css'
import { RiDashboardLine, RiCalendarScheduleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
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
                <a href="#dashboard">
                    <RiDashboardLine className='icon'/> Dashboard
                </a>
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
        </ul>

        <button className="LogoutBtn">Log Out</button>
    </div>
   ) 
}

export default Sidebar;