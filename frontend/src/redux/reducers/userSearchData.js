import { createReducer } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem("searchResults")
  ? JSON.parse(localStorage.getItem("searchResults"))
  : {};

const initialState = {
  isLoading: true,
  search: persistedState,
};

export const userSearchReducer = createReducer(initialState, {
  searchCreateRequest: (state) => {
    state.isLoading = true;
  },
  searchCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.search = action.payload;
    state.success = true;
  },
  searchCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
