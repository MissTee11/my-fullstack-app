import { configureStore } from "@reduxjs/toolkit";
import patientReducer from './slices/patientSlice';
import doctorReducer from './slices/doctorSlice';
import staffReducer from './slices/staffSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
    reducer: {
        patients: patientReducer,
        doctors: doctorReducer,
        staff: staffReducer,
        appointments: appointmentReducer,
    },
});
export default store;
 