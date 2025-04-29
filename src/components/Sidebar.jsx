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
        
        <ul className="sidebar-list">
            <li className="sidebar-item">
                <Link to='/Dashboard'>
                <RiDashboardLine className='icon'/> 
                <span className='sidebar-text'>Dashboard</span>
                </Link>
                 
            </li>
            <li className="sidebar-item">
                <Link to="/Doctors">
                    <FaUserDoctor className='icon'/> 
                    <span className='sidebar-text'>Doctors</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Patients">
                    <IoPersonSharp className='icon'/> 
                    <span className='sidebar-text'>Patients</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Staff">
                    <IoPersonSharp className='icon'/> 
                    <span className='sidebar-text'>General Staff</span> 
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Appointments">
                    <RiCalendarScheduleFill className='icon'/> 
                    <span className='sidebar-text'>Appointments</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Admissions">
                    <FaBed className='icon'/>
                    <span className='sidebar-text'>Admissions</span> 
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Rooms">
                    <MdBedroomChild className='icon'/>
                    <span className='sidebar-text'>Rooms </span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link to="/Payments">
                    <MdOutlinePayment className='icon'/> 
                    <span className='sidebar-text'>Payments</span>
                </Link>
            </li>
        </ul>
        <Link to='/LoginPage'>
        <button className="LogoutBtn"><IoLogOut/>
        <span className='sidebar-text'>Log Out</span></button>
        </Link>
       
    </div>
   ) 
}

export default Sidebar;