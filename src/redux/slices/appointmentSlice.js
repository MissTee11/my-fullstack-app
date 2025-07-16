import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getTodaysAppointments } from '../../api';

export const fetchTodaysAppointments = createAsyncThunk('appointments/fetchTodaysAppointments', async ()=>{
    const res = await getTodaysAppointments();
    return res.data;
});

const appointmentSlice= createSlice({
    name:'appointments',
    initialState:{
        today: [],
        todayTotal: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodaysAppointments.fulfilled, (state, action)=>{
            state.today = action.payload;
            state.todayTotal = action.payload.length;
        });
    },
});
export default appointmentSlice.reducer;