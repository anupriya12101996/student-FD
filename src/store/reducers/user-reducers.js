import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: localStorage.getItem('email') || '',
    },
    reducers: {
        setEmailValue: (state, action) => {
            localStorage.setItem('email', action.payload);
            state.email = action.payload;
        }
    }
});

export const { setEmailValue } = userSlice.actions;
export default userSlice.reducer;