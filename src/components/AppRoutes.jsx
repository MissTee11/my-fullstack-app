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
import UpdateAdmissions from "../pages/UpdateAdmission";
import UpdateAppointment from "../pages/UpdateAppointment";
import UpdateDoctor from "../pages/UpdateDoctor";
import UpdatePatient from "../pages/UpdatePatients";
import UpdateStaff from "../pages/UpdateStaff";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Rooms from "../pages/Rooms";
import Payments from "../pages/Payments";
import AddPayment from "../pages/AddPayment";
import UpdatePayment from "../pages/UpdatePayment";
import MedicalRecord from "../pages/MedicalRecord";
import UpdateRecord from "../pages/UpdateRecord";
import AddRecord from "../pages/AddRecord";

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
            <Route path='/UpdateAdmission/:id' element={<UpdateAdmissions/>}/>
            <Route path='/UpdateAppointment/:id' element={<UpdateAppointment/>}/>
            <Route path='/UpdateDoctor/:id' element={<UpdateDoctor/>}/>
            <Route path='/UpdatePatient/:id' element={<UpdatePatient/>}/>
            <Route path='/UpdateStaff/:id' element={<UpdateStaff/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/LoginPage' element={<LoginPage/>}/>
            <Route path ='/Rooms' element={<Rooms/>}/>
            <Route path ='/Payments' element={<Payments/>}/>
            <Route path ='/AddPayment' element={<AddPayment/>}/>
            <Route path ='/UpdatePayment/:id' element={<UpdatePayment/>}/>
            <Route path='/UpdateRecord/:id' element={<UpdateRecord/>}/>
            <Route path='/AddRecord/:id' element={<AddRecord/>}/>
            <Route path='/MedicalRecord/:id' element={<MedicalRecord/>}/>
            <Route path="/AddAdmissions/:roomNumber" element={<AddAdmissions />} />

        </Routes>
        
        
        </BrowserRouter>
    )
}
export default AppRoutes;