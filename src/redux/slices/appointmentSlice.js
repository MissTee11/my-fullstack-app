import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getTodaysAppointments } from '../../api';

//createAsyncThunk to fetch appointments asynchronously
export const fetchTodaysAppointments = createAsyncThunk('appointments/fetchTodaysAppointments', async ()=>{
    const res = await getTodaysAppointments();
    return res.data;//tnen sent as action.payload
});

const appointmentSlice= createSlice({
    name:'appointments',
    initialState:{
        today: [],//list of today's appointments
        todayTotal: 0,//number of appointments
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodaysAppointments.fulfilled, (state, action)=>{//when API request is sucessful the slice updates its state with new data
            state.today = action.payload;
            state.todayTotal = action.payload.length;//count how many appointments there are
        });
    },
});
export default appointmentSlice.reducer;