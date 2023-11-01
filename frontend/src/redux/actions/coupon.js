import axios from "axios";
import { server } from "../../server";

// get all coupons

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCouponsRequest",
    });
    const { data } = await axios.get(`${server}/coupon/get-all-coupons`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllCouponsSuccess",
      payload: data.allCoupons,
    });
  } catch (error) {
    dispatch({
      type: "getAllCouponsFailed",
      payload: error.response.data.message,
    });
  }
};

// delete coupons admin

export const deleteCoupons = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCouponRequest",
    });
    const { data } = await axios.delete(
      `${server}/coupon/delete-coupon/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteCouponSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCouponFailed",
      payload: error.response.data.message,
    });
  }
};
