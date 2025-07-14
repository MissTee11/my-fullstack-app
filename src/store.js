import { configureStore } from "@reduxjs/toolkit";
import patientReducer from '../src/features/patientSlice';
import doctorReducer from '../src/features/doctorSlice';
import staffReducer from '../src/features/staffSlice';
import appointmentReducer from '../src/features/appointmentSlice';

const store = configureStore({
    reducer: {
        patients: patientReducer,
        doctors: doctorReducer,
        staff: staffReducer,
        appointments: appointmentReducer,
    },
});
export default store;
 