import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isLoading: true,
}

export const bookingsReducer = createReducer(initialState,{
    // get all bookings
    getAllBookingsRequest:(state)=>{
        state.isLoading = true
    },
    getAllBookingsSuccess:(state, action) =>{
        state.isLoading = false;
        state.allBookings = action.payload
    },
    getAllBookingsFailed:(state, action) =>{
        state.isLoading = false;
        state.error = action.payload
    },
    clearErrors:(state) =>{
        state.error=  null
    }
})