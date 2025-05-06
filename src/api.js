import axios from "axios";

const API_BASE_URL ="http://localhost:5000/api";

/*PATIENTS*/
export const getPatients = () => axios.get(`${API_BASE_URL}/patients`);
export const getSinglePatient = (id) => axios.get(`${API_BASE_URL}/patients/${id}`);
export const updatePatient = (id, patientData) => axios.put(`${API_BASE_URL}/patients/${id}`, patientData);
export const deletePatient = (id) => axios.delete(`${API_BASE_URL}/patients/${id}`);
export const createPatient = (patientData) => axios.post(`${API_BASE_URL}/patients`, patientData);


