import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
    isAuth: false,
    user: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state,action) =>{
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) =>{
            state.user = null;
            state.isAuth = false
        }
    }
});


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;