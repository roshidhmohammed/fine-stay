import { createReducer } from "@reduxjs/toolkit";


const initialState ={
    isLoading: true,
}

export const amenitiesReducer = createReducer(initialState,{
    // get all amenities
    getAllAmenitiesRequest:(state)=>{
        state.isLoading = true
    },
    getAllAmenitiesSuccess:(state, action)=>{
        state.isLoading = false;
        state.allAmenities=  action.payload;
    },
    getAllAmenitiesFailed:(state, action)=>{
        state.isLoading = false;
        state.error = action.payload;
    },
    // delete amenities admin
    deleteAmenitiesRequest:(state) =>{
        state.isLoading= true;
     },
     deleteAmenitiesSuccess:(state, action) =>{
        state.isLoading = false;
        state.message  = action.payload;
     },
     deleteAmenitiesFailed:(state, action) =>{
        state.isLoading = false;
        state.error = action.payload;
     },
    clearErrors:(state)=>{
        state.error = null
    }

})