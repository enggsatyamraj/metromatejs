import { combineReducers } from "@reduxjs/toolkit";

import profileReducer from '../slices/profileSlice'
import authReducer from '../slices/authSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
})

export default rootReducer