import Sidebar from "../components/Sidebar";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/slices/doctorSlice';
import { fetchPatients } from '../redux/slices/patientSlice';
import { fetchStaff } from '../redux/slices/staffSlice';
import { fetchTodaysAppointments } from '../redux/slices/appointmentSlice';


function Dashboard(){
    const dispatch = useDispatch();

    const doctorTotal = useSelector((state) => state.doctors.total);
    const patientTotal = useSelector((state) => state.patients.total);
    const staffTotal = useSelector((state) => state.doctors.total);
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
            
            <div className='DashBoard' >
                <div className='CardContainer'>

                    <div className='Card'>
                        <p>Total Patients: {patientTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Total Doctors: {doctorTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Total Staff: {staffTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Appointments Today: {appointmentToday}</p>
                    </div>
                </div>
            
            </div>
          
        </div>
    )

}
export default Dashboard;