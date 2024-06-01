import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getUserData} from "./userSlice";

const userEmployerSlice = createSlice({
    name: "userEmployer",
    initialState: {
         employerName: null,
         founder: null,
         foundingData: null,
         address: null,
         numberOfEmployees: null,
         website: null,
         story: null,
        emailToConnect: null,
        vacancies: []
    },
    reducers:{

    },
    extraReducers: (builder, action) => {
        builder.addCase(getEmployerData.fulfilled, (state, action) =>{
            state.employerName = action.payload.employerName;
            state.email = action.payload.email;
            state.founder = action.payload.founder;
            state.foundingData = action.payload.foundingData;
            state.address = action.payload.address;
            state.numberOfEmployees = action.payload.numberOfEmployees;
            state.website = action.payload.website;
            state.story = action.payload.story;
            state.emailToConnect = action.payload.emailToConnect;
            state.vacancies = action.payload.vacancies;
        })
            .addCase(updateEmployerData.fulfilled, (state, action) => {
                state.employerName = action.payload.employerName;
                state.email = action.payload.email;
                state.founder = action.payload.founder;
                state.foundingData = action.payload.foundingData;
                state.address = action.payload.address;
                state.numberOfEmployees = action.payload.numberOfEmployees;
                state.website = action.payload.website;
                state.story = action.payload.story;
                state.emailToConnect = action.payload.emailToConnect;
                state.vacancies = action.payload.vacancies;
            })
    }
});

export const getEmployerData = createAsyncThunk(
    "userEmployerSlice/getEmployerData",async () =>{
        var response = await axios.get("http://localhost:5259/employer",
            {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                params:{
                }
            });

        var data = response.data;
        return data;
    });

export const updateEmployerData = createAsyncThunk("userEmployerSlice/updateEmployerData",
    async(requestData) => {
    console.log(requestData)
        var response = await axios.patch("http://localhost:5259/updateEmployerInfo",
            requestData,
            {
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
            });
        console.log("Response of updateData" + response.data);
        return response.data;
    })

export default userEmployerSlice.reducer;