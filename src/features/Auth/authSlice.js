import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogedin : false ,
    token : '',
    userInfo :{
        
    }
}

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            state.isLogedin = true 
            state.userInfo = action.payload['userInfo']
            state.token = action.payload['token']
        },

        logOut: (state) => {
            state.isLogedin = false 
            state.username = ''
            state.password = ''
            state.token = ''
        }
    }

})


export const {login, logOut} = authSlice.actions;
export default authSlice.reducer;