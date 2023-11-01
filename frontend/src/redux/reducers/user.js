import {createReducer} from "@reduxjs/toolkit"


const initialState = {
    isAuthenticated:false,
   
}

export const userReducer = createReducer(initialState,{
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) =>{
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) =>{
        state.loading = false;
        state.error =  action.payload;
        state.isAuthenticated = false;
    },
    // get all users
    getAllUsersRequest:(state)=>{
        state.loading= true
    },
    getAllUsersSuccess:(state, action)=>{
        state.loading=false;
        state.allUsers = action.payload
    },
    getAllUsersFailed:(state,action)=>{
        state.loading=false;
        state.error= action.payload;

    },
    // block  user
    getBlockUserRequest:(state)=>{
        state.loading = true
    },
    getBlockUserSuccess:(state, action)=>{
        state.loading = false;
        state.blockMessage = action.payload;
        state.success = true
    },
    getBlockUserFailed:(state, action) =>{
        state.loading = false;
        state.error = action.payload;
        state.success  =false
    },
    // unblock user
    getUnblockUserRequest:(state)=>{
        state.loading= true
    },
    getUnblockUserSuccess:(state, action) =>{
        state.loading= false;
        state.unblockMessage = action.payload;
        state.sucess = true;
    },
    getUnblockUserFailed:(state, action) =>{
        state.loading = false;
        state.error = action.payload;
        state.success = false;
    },
    clearErrors: (state) =>{
        state.error = null;
    },
});
