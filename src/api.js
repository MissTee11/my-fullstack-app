import axios from "axios";

const API_BASE_URL ="http://localhost:5000/api";

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
export const getSpecialties= () => axios.get(`${API_BASE_URL}/specialty`)

