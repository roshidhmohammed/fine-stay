import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isLoading: true,
}

export const couponReducer = createReducer(initialState,{
    // get all coupons
getAllCouponsRequest:(state)=>{
    state.isLoading = true;
},
getAllCouponsSuccess:(state,action) =>{
    state.isLoading = false;
    state.allCoupons = action.payload;
    state.success  = true
},
getAllCouponsFailed:(state, action) =>{
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
}, 

// coupons delete admin
 deleteCouponRequest:(state) =>{
    state.isLoading= true;
 },
 deleteCouponSuccess:(state, action) =>{
    state.isLoading = false;
    state.message  = action.payload;
    // state.success = true
 },
 deleteCouponFailed:(state, action) =>{
    state.isLoading = false;
    state.error = action.payload;
    // state.success = false;
 },
clearErrors:(state)=>{
    state.error = null
},
})