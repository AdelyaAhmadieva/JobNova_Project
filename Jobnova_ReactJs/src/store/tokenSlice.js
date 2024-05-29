import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./userSlice";


const tokenSlice = createSlice({
    name: "token",
    initialState: {
        token: null,
        error: null,
        status: null
    },
    reducers:{
        getTokenOnStart(state, action) {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getToken.fulfilled, (state, action) =>{
                state.token = action.payload.data.token
                state.error = null
                state.status = "ok"

                localStorage.setItem("token", action.payload.data.token)
            })
            .addCase(getToken.rejected, (state, action) =>{
                state.error = action.error.code
                state.token = null
                state.status = "error"
            })
    }
});

export const getToken = createAsyncThunk(
    "/userSlice/getToken",
    async(credentials) =>
    {
        function getCookieByName(name){
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        axios.defaults.withCredentials = true;
        var request = await axios.post("http://localhost:5259/login",
            credentials,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

        return request;
    });

export default tokenSlice.reducer;