import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getAppointment } from '../../api';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async ()=>{
    const data = await getAppointment();
    return data;
});

const appointmentSlice= createSlice({
    name:'appointments',
    initialState:{
        list: [],
        total: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAppointments.fulfilled, (state, action)=>{
            state.list = action.payload;
            state.total = action.payload.length;
        });
    },
});
export default appointmentSlice.reducer;