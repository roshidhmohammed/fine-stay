import axios from "axios";
import { server } from "../../server";

// get all amenities

export const getAllAmenities = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllAmenitiesRequest",
    });
    const { data } = await axios.get(`${server}/amenities/get-all-amenties`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllAmenitiesSuccess",
      payload: data.allAmenities,
    });
  } catch (error) {
    dispatch({
      type: "getAllAmenitiesFailed",
      payload: error.response.data.message,
    });
  }
};

//   delete amenities

export const deleteAmenities = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteAmenitiesRequest",
    });
    const { data } = await axios.delete(
      `${server}/amenities/delete-amenity/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteAmenitiesSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteAmenitiesFailed",
      payload: error.response.data.message,
    });
  }
};
