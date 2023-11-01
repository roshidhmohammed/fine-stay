import axios from "axios";
import { server } from "../../server";

export const getAllPartners = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPartnersRequest",
    });
    const { data } = await axios.get(`${server}/partner/get-all-partners`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllPartnersSuccess",
      payload: data.allPartners,
    });
  } catch (error) {
    dispatch({
      type: "getAllPartnersFailed",
      payload: error.response.data.message,
    });
  }
};
