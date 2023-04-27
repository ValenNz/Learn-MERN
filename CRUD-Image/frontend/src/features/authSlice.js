/*  file yang berisi informasi tentang perubahan yang akan dilakukan pada store. (auth) */

/* Import Module */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Membuat default state */
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

/* Fungsi Login */
export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {
                                        // nama thunk/nama function
    /* 
    createAsyncThunk : Fungsi (API) yang menerima string jenis tindakan Redux dan fungsi panggilan balik yang harus mengembalikan janji(promise).
    createAsyncThunk accepts three parameters: a string action type value, a payloadCreator callback, and an options object.
    -   pending: 'users/requestStatus/pending'
    -   fulfilled: 'users/requestStatus/fulfilled'
    -   rejected: 'users/requestStatus/rejected'
    
    */
    try {
        /* Menangkap response dari user dengan axios */
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data; // mengemballikan data login
    } catch (err) {
        if(err.response){
            const message = err.response.data.msg; // menangkap error (message) dari backend 
            return thunkAPI.rejectWithValue(message); // rejectWithValue - utility (additional option from thunkAPI) that you can return/throw in your action creator to return a rejected response with a defined payload and meta
        }
    }
}) 

/* Fungsi Profie */
export const profileUser = createAsyncThunk("user/profileUser", async(_, thunkAPI) => {
    try {
        /* Menangkap response dari user dengan axios */
        const response = await axios.get('http://localhost:5000/profile');
        return response.data; // mengemballikan data login
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

/* Fungsi Logout */
export const LogoutUser = createAsyncThunk("user/LogoutUser", async() => {
    await axios.delete('http://localhost:5000/logout');
});

/* Membuat auth slice */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    /* Mereload data (reset) */
    reducers:{
        reset: (state) => initialState
    },
    /* Proses createAsycThuck */
    extraReducers:(builder) =>{

        /* Menangkap Action Login */
        /* Ngeload Data */
        builder.addCase(loginUser.pending, (state) =>{
            state.isLoading = true;
        });
        /* Data Success */
        builder.addCase(loginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        /* Data erroro */
        builder.addCase(loginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload; // payload merupakan data yang dikirimakan ke action nya 
        })

        /* Menangkap Action Profile */
        /* Ngeload Data */
        builder.addCase(profileUser.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(profileUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(profileUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions; // export actionya (perubahan)
export default authSlice.reducer; // export reducewr agar dapoat digunakan di store