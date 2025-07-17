import Calendar from "react-calendar";
import { useEffect, useState } from 'react';
import { getAppointmentsByDate } from "../api";
import { formatDateInput } from "../utilities/DateFormat";
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import './Components.css'; // Your custom styles

function AppointmentCalender() {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const selectedDate = formatDateInput(date);
            try {
                const res = await getAppointmentsByDate(selectedDate);
                setAppointments(res.data);
            } catch (err) {
                console.error("Error fetching appointments", err);
            }
        };
        fetchData();
    }, [date]);

    return (
        <div className="calendar-container">
            <h2 className='apptCalender'>Appointment Calendar</h2>
            <div className='DisplayAppts'>
                <Calendar onChange={setDate} value={date} />

                <div className='details-container'>
                    <h3>Appointments on {formatDateInput(date)}:</h3>
                    <ul>
                        {appointments.length === 0 ? (
                            <li>No appointments</li>
                        ) : (
                            appointments.map((appt) => (
                                <li key={appt.id}>
                                    {appt.patient_first_name} {appt.patient_last_name} @{" "}
                                    {new Date(`1970-01-01T${appt.time}`).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    with Dr. {appt.doctor_first_name} {appt.doctor_last_name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AppointmentCalender;