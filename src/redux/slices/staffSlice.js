import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getStaff } from '../../api';

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async ()=>{
    const data = await getStaff();
    return data;
});

const staffSlice= createSlice({
    name:'staff',
    initialState:{
        list: [],
        total: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStaff.fulfilled, (state, action)=>{
            state.list = action.payload;
            state.total = action.payload.length;
        });
    },
});
export default staffSlice.reducer;