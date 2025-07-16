import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getPatients } from '../../api';

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async ()=>{
    const res = await getPatients();
    return res.data;
});

const patientSlice= createSlice({
    name:'patients',
    initialState:{
        list: [],
        total: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPatients.fulfilled, (state, action)=>{
            state.list = action.payload;
            state.total = action.payload.length;
        });
    },
});
export default patientSlice.reducer;