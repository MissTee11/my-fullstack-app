import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getDoctors } from '../../api';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async ()=>{
    const data = await getDoctors();
    return data;
});

const doctorSlice= createSlice({
    name:'doctors',
    initialState:{
        list: [],
        total: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDoctors.fulfilled, (state, action)=>{
            state.list = action.payload;
            state.total = action.payload.length;
        });
    },
});
export default doctorSlice.reducer;