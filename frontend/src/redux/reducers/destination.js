import { createReducer } from "@reduxjs/toolkit";


const initialState ={
    isLoading: true,
}

export const destinationReducer = createReducer(initialState,{
    // get all destination
    getAllDestinationRequest:(state)=>{
        state.isLoading = true
    },
    getAllDestinationSuccess:(state, action)=>{
        state.isLoading = false;
        state.allDestination=  action.payload;
    },
    getAllDestinationFailed:(state, action)=>{
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors:(state)=>{
        state.error = null
    }

})