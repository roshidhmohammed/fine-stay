import { createReducer } from "@reduxjs/toolkit";


const initialState ={
    isLoading: true,
}

export const categoryReducer = createReducer(initialState,{
    // get all Categories
    getAllCategoriesRequest:(state)=>{
        state.isLoading = true
    },
    getAllCategoriesSuccess:(state, action)=>{
        state.isLoading = false;
        state.allCategories=  action.payload;
    },
    getAllCategoriesFailed:(state, action)=>{
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors:(state)=>{
        state.error = null
    }

})