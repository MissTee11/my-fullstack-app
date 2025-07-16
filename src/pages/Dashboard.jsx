import Sidebar from "../components/Sidebar";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/slices/doctorSlice';
import { fetchPatients } from '../redux/slices/patientSlice';
import { fetchStaff } from '../redux/slices/staffSlice';
import { fetchTodaysAppointments } from '../redux/slices/appointmentSlice';
import { IoPersonSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import AppointmentCalender from "../components/CalenderSection";


function Dashboard(){
    const dispatch = useDispatch();

    const doctorTotal = useSelector((state) => state.doctors.total);
    const patientTotal = useSelector((state) => state.patients.total);
    const staffTotal = useSelector((state) => state.staff.total);
    const appointmentToday = useSelector((state) => state.appointments.todayTotal);

    useEffect(()=>{
        dispatch(fetchDoctors());
        dispatch(fetchPatients());
        dispatch(fetchStaff());
        dispatch(fetchTodaysAppointments());
    },[dispatch]);
    
    return(

        <div>
            <Sidebar/>

            <div className='MainContent'>
                <h1 className="PageHeader">Dashboard</h1>

                <div className='CardContainer'>
                    <div className='Card'>
                        <IoPersonSharp className='TotalLabel'/>
                        <p className='TotalLabel'>Total Patients: </p>
                        <p className='count'>{patientTotal}</p>
                    </div>

                    <div className='Card1'>
                        <FaUserDoctor className='TotalLabel'/>
                        <p className='TotalLabel'> Total Doctors:</p>
                        <p className='count'> {doctorTotal}</p>
                    </div>

                    <div className='Card'>
                        <IoPersonSharp className='TotalLabel'/>
                        <p className='TotalLabel'>Total Staff:</p>
                        <p className='count'>{staffTotal}</p>
                    </div>

                    <div className='Card1'>
                        <RiCalendarScheduleFill className='TotalLabel'/>
                        <p className='TotalLabel'> Appointments Today: </p>
                        <p className='count'>{appointmentToday}</p>
                    </div>
                </div>

                <AppointmentCalender />

            </div>

          
        </div>
    )

}
export default Dashboard;