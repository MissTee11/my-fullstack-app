import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/*USER AUTHENTIATION*/

axios.interceptors.request.use(//interceptor
  (config) => {
    const token = localStorage.getItem('token');//get token from the rowser storage
    if (token) {
      config.headers['x-auth-token'] = token;//add token to every request header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login=(credentials)=> axios.post(`${API_BASE_URL}/auth/login`, credentials);
//export const getAdminData =() => api.get('/admin/admin-data');
export default axios;

/*PATIENTS*/
export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const getSinglePatient = (id) => axios.get(`${API_BASE_URL}/patients/${id}`);
export const updatePatient = (id, patientData) => axios.put(`${API_BASE_URL}/patients/${id}`, patientData);
export const deletePatient = (id) => axios.delete(`${API_BASE_URL}/patients/${id}`);
export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);

/*DOCTORS*/
export const getDoctors = () => axios.get(`${API_BASE_URL}/doctors`);
export const getSingleDoctor =(id)=> axios.get(`${API_BASE_URL}/doctors/${id}`);
export const updateDoctor= (id, doctorData) => axios.put(`${API_BASE_URL}/doctors/${id}`, doctorData)
export const deleteDoctor = (id)=> axios.delete(`${API_BASE_URL}/doctor/${id}`);
export const createDoctor=(doctorData)=> axios.post(`${API_BASE_URL}/doctors`, doctorData);

/*SPECIALTIES*/
export const getSpecialties= () => axios.get(`${API_BASE_URL}/specialty`);

/*DEPARTMENTS*/
export const getDepartments= ()=> axios.get(`${API_BASE_URL}/department`);

/*ROLES*/
export const getRoles= () => axios.get(`${API_BASE_URL}/roles`);

/*ROOMS*/
export const getRooms=() => axios.get(`${API_BASE_URL}/rooms`);
export const getSingleRoom = (roomNumber) => axios.get(`${API_BASE_URL}/rooms/${roomNumber}`);


/*STAFF MEMBERS*/
export const getStaff = () => axios.get(`${API_BASE_URL}/staff`);
export const getSingleStaff =(id)=> axios.get(`${API_BASE_URL}/staff/${id}`);
export const updateStaff= (id, staffData) => axios.put(`${API_BASE_URL}/staff/${id}`, staffData)
export const deleteStaff = (id)=> axios.delete(`${API_BASE_URL}/staff/${id}`);
export const createStaff=(staffData)=> axios.post(`${API_BASE_URL}/staff`, staffData);

/*APPOINTMENTS*/
export const getAppointment = () => axios.get(`${API_BASE_URL}/appointments`);
export const getAppointmentsByDate= (date)=>axios.get(`${API_BASE_URL}/appointments/date/${date}`)
export const getTodaysAppointments = () => axios.get(`${API_BASE_URL}/appointments/today`);
export const getSingleAppointment =(id)=> axios.get(`${API_BASE_URL}/appointments/${id}`);
export const updateAppointment= (id, appData) => axios.put(`${API_BASE_URL}/appointments/${id}`, appData)
export const deleteAppointment = (id)=> axios.delete(`${API_BASE_URL}/appointments/${id}`);
export const createAppointment=(appData)=> axios.post(`${API_BASE_URL}/appointments`, appData);

/*ADMISSIONS*/
export const getAdmission = () => axios.get(`${API_BASE_URL}/admissions`);
export const getSingleAdmission =(id)=> axios.get(`${API_BASE_URL}/admissions/${id}`);
export const updateAdmission= (id, admiData) => axios.put(`${API_BASE_URL}/admissions/${id}`, admiData)
export const deleteAdmission = (id)=> axios.delete(`${API_BASE_URL}/admissions/${id}`);
export const createAdmission=(admiData)=> axios.post(`${API_BASE_URL}/admissions`, admiData);

/*PAYMENTS*/
export const getPayment = () => axios.get(`${API_BASE_URL}/payments`);
export const getSinglePayment =(id)=> axios.get(`${API_BASE_URL}/payments/${id}`);
export const updatePayment= (id, payData) => axios.put(`${API_BASE_URL}/payments/${id}`, payData)
export const deletePayment = (id)=> axios.delete(`${API_BASE_URL}/payments/${id}`);
export const createPayment=(payData)=> axios.post(`${API_BASE_URL}/payments`, payData);

/*MEDICAL RECORDS*/
/*PAYMENTS*/
export const getMedicalRecord = (id) => axios.get(`${API_BASE_URL}/medical_records/patient/${id}`);
export const getSingleRecord =(id)=> axios.get(`${API_BASE_URL}/medical_records/${id}`);
export const updateRecord= (id, medData) => axios.put(`${API_BASE_URL}/medical_records/${id}`, medData)
export const deleteRecord = (id)=> axios.delete(`${API_BASE_URL}/medical_records/${id}`);
export const createRecord=(medData)=> axios.post(`${API_BASE_URL}/medical_records`, medData);



