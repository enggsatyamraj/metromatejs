import { combineReducers } from "@reduxjs/toolkit";

import profileReducer from '../slices/profileSlice'
import authReducer from '../slices/authSlice'
import themeReducer from '../slices/themeSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    theme:themeReducer,
})

export default rootReducer