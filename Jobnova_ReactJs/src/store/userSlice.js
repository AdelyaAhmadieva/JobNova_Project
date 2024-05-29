import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({

    name: "user",
    initialState: {
        role: null,
        email: null,
        id: null,
        password: null,
        state: null
    },
    reducers:{
        logout: (state) => {
            state.email = null;
            state.role = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder, action) => {
       builder
           .addCase(getUserData.fulfilled, (state, action) =>{
               state.role = action.payload.role;
               state.email = action.payload.email;
               state.id = action.payload.id;
           })

    }

});

export const getUserData = createAsyncThunk("userSlice/getUserData",
    async(data,) => {
        var responce = await axios.get("http://localhost:5259/getInfo", {
            headers:{

                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        console.log(responce.data);
        return responce.data;
    });



export default userSlice.reducer;

export const {logout} = userSlice.actions;


