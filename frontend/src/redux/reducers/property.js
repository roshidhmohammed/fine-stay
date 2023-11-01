import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading:true,
}

export const propertyReducer = createReducer(initialState,{
    propertyCreateRequest: (state) =>{
        state.isLoading = true
    },
    propertyCreateSuccess:(state, action) =>{
        state.isLoading = false;
        state.property= action.payload;
        state.success = true

    },
    propertyCreateFail:(state, action) =>{
        state.isLoading = false;
        state.error =action.payload;
        state.success = false;
    },
// get all properties of a partner
    getPartnerAllPropertiesRequest:(state) => {
        state.isLoading = true
    },
    getPartnerAllPropertiesSuccess:(state, action) =>{
        state.isLoading = false;
        state.properties = action.payload;
    },
    getPartnerAllPropertiesFailed:(state,action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete property
    getDeletePropertyRequest:(state) =>{
        state.isLoading = true
    },
    getDeletePropertySuccess:(state, action) =>{
        state.isLoading = false;
        state.message = action.payload
    },
    getDeletePropertyFailed:(state, action) =>{
        state.isLoading = false;
        state.error = action.payload
    },

    // get all properties

    getAllPropertiesRequest:(state) => {
        state.isLoading = true
    },
    getAllPropertiesSuccess:(state,action) =>{
        state.isLoading = false;
        state.allProperties = action.payload
    },
    getAllPropertiesFailed:(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
    },
    
    // get all properties  of partner admin
    getAdminPartnerAllPropertiesRequest:(state) =>{
        state.isLoading= true
    },
    getAdminPartnerAllPropertiesSuccess:(state, action) =>{
        state.isLoading = false;
        state.partnerProperties  = action.payload;
    },
    getAdminPartnerAllPropertiesFailed:(state, action) =>{
        state.isLoading = false;
        state.error = action.payload
    },
    clearErrors:(state) =>{
        state.error =null;
    }
})