import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doctors from '../pages/Doctors';
import Patients from '../pages/Patients';
import Staff from '../pages/Staff';
import Appointments from '../pages/Appointments';
import Admissions from '../pages/Admissions';
import App from '../App'
import AddDoctor from "../pages/AddDoctor";
import AddPatient from "../pages/AddPatient";
import AddStaff from "../pages/AddStaff";
import AddAppointments from "../pages/AddAppointment";
import AddAdmissions from "../pages/AddAdmission";

function AppRoutes(){
    return(
        <BrowserRouter>

        <Routes>
            <Route path='/Doctors' element={<Doctors/>}/>
            <Route path='/' element={<App/>}/>
            <Route path='/Patients' element={<Patients/>}/>
            <Route path='/Staff' element={<Staff/>}/>
            <Route path='/Appointments' element={<Appointments/>}/>
            <Route path='/Admissions' element={<Admissions/>}/>
            <Route path='/AddDoctor' element={<AddDoctor/>}/>
            <Route path='/AddPatient' element={<AddPatient/>}/>
            <Route path='/AddStaff' element={<AddStaff/>}/>
            <Route path ='/AddAppointment' element={<AddAppointments/>}/>
            <Route path='/AddAdmissions' element={<AddAdmissions/>}/>
        </Routes>
        
        
        </BrowserRouter>
    )
}
export default AppRoutes;