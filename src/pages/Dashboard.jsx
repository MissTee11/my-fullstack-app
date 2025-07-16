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

                <div className='CardContainer'>
                    <div className='Card'>
                        <p>Total Patients: </p>
                        <p>{patientTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Total Doctors:</p>
                        <p> {doctorTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Total Staff:</p>
                        <p>{staffTotal}</p>
                    </div>

                    <div className='Card'>
                        <p>Appointments Today: </p>
                        <p>{appointmentToday}</p>
                    </div>
                </div>
            
            </div>

            
           
          
        </div>
    )

}
export default Dashboard;