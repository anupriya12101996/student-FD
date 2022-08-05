import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user-reducers";

export default configureStore({
    reducer: {
        user: userReducers
    }
});