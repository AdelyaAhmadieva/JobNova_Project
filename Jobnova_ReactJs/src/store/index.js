import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import tokenReducer from "./tokenSlice"

import userCandidateReducer from "./userCandidateSlice"
import userEmployerReducer from "./userEmployerSlice"
const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        candidate: userCandidateReducer,
        employer: userEmployerReducer

    }
});

export default store;