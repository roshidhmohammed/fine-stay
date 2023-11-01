import axios from "axios";
import { server } from "../../server";

// loadUser

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// get all users

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });
    const { data } = await axios.get(`${server}/user/get-all-users`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.allUsers,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};

// block  user

export const blockUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getBlockUserRequest",
    });
    const { data } = await axios.put(`${server}/user/block-user/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getBlockUserSuccess",
      payload: data.blockUser,
    });
  } catch (error) {
    dispatch({
      type: "getBlockUserFailed",
      payload: error.response.data.message,
    });
  }
};

// unblock user
export const unblockUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getUnblockUserRequest",
    });

    const { data } = await axios.put(`${server}/user/unblock-user/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "getUnblockUserSuccess",
      payload: data.unblockUser,
    });
  } catch (error) {
    dispatch({
      type: "getUnblockUserFailed",
      payload: error.response.data.message,
    });
  }
};

// load partner

export const loadPartner = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadPartnerRequest",
    });
    const { data } = await axios.get(`${server}/partner/getPartner`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadPartnerSuccess",
      payload: data.partner,
    });
  } catch (error) {
    dispatch({
      type: "LoadPartnerFail",
      payload: error.response.data.message,
    });
  }
};
