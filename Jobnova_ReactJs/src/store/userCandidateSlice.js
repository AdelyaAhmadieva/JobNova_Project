import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const userCandidateSlice = createSlice({

    name: "userCandidate",
    initialState: {
        firstName: null,
        lastName: null,
        introduction: null,
        phoneNumber: null,
        website: null,
        resumes: null
    },
    reducers:{

    },
    extraReducers: (builder, action) => {
        builder
            .addCase(getCandidateData.fulfilled, (state, action) =>{
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.introduction = action.payload.introduction;
                state.phoneNumber = action.payload.phoneNumber;
                state.website = action.payload.website;
                state.resumes = action.payload.resumes;

            })
            .addCase(updateCandidateData.fulfilled, (state, action) => {

            })
    }
});

export const getCandidateData = createAsyncThunk("userSlice/getCandidateData",
    async(data,) => {
        var response = await axios.get("http://localhost:5259/candidate", {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        console.log(response.data);
        return response.data;
    });

export const updateCandidateData = createAsyncThunk("userSlice/updateUserData",
    async(requestData) => {
        var response = await axios.patch("http://localhost:5259/updateCandidateInfo",
            requestData,
            {
                headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
            });
        console.log("Response of updateData" + response.data);
    })


export default userCandidateSlice.reducer;

export const {logout} = userCandidateSlice.actions;


