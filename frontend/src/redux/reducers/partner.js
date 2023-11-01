import {createReducer} from "@reduxjs/toolkit"


const initialState = {
    isLoading:true,
   
}

export const partnerReducer = createReducer(initialState,{
    LoadPartnerRequest: (state) => {
        state.isLoading = true;
    },
    LoadPartnerSuccess: (state, action) =>{
        state.isPartner = true;
        state.isLoading = false;
        state.partner = action.payload;
    },
    LoadPartnerFail: (state, action) =>{
        state.isLoading = false;
        state.error =  action.payload;
        state.isPartner = false;
    },
    // get all partners
    getAllPartnersRequest:(state)=>{
        state.isLoading = true;
    },
    getAllPartnersSuccess: (state, action) =>{
        state.isLoading = false;
        state.allPartners = action.payload;
        state.success = true;
    },
    getAllPartnersFailed: (state, action) =>{
        state.isLoading = false;
        state.error = action.payload;
        state.success= false;
    },
    clearErrors: (state) =>{
        state.error = null;
    },
});
