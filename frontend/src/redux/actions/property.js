import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

// create property
export const createProperty =
  ({
    propertyName,
    category,
    price,
    currentLocation,
    amenities,
    description,
    roomsCount,
    images,
    partnerId,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "propertyCreateRequest",
        // payload:data.property
      });
      const { data } = axios
        .post(
          `${server}/property/create-property`,
          {
            propertyName,
            category,
            price,
            currentLocation,
            amenities,
            description,
            roomsCount,
            images,
            partnerId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
      dispatch({
        type: "propertyCreateSuccess",
        payload: data.property,
      });
    } catch (error) {
      dispatch({
        type: "propertyCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get all properties of a partner

export const getPartnerAllProperties = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getPartnerAllPropertiesRequest",
    });

    const { data } = await axios.get(
      `${server}/property/get-all-properties-partner/${id}`,
      {withCredentials:true}
    );
    dispatch({
      type: "getPartnerAllPropertiesSuccess",
      payload: data.filterProperty,
    });
  } catch (error) {
    dispatch({
      type: " getPartnerAllPropertiesFailed",
      payload: error.response.data.message,
    });
  }
};

// deleting property by partner
export const getDeleteProperty = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getDeletePropertyRequest",
    });

    const { data } = await axios.delete(
      `${server}/property/delete-partner-property/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getDeletePropertySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "getDeletePropertyFailed",
      payload: error.response.data.message,
    });
  }
};

// get all properties

export const getAllProperties = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPropertiesRequest",
    });

    const { data } = await axios.get(`${server}/property/get-all-properties`);
    dispatch({
      type: "getAllPropertiesSuccess",
      payload: data.propertiesListed,
    });
  } catch (error) {
    dispatch({
      type: "getAllPropertiesFailed",
      payload: error.response.data.message,
    });
  }
};

// get all partner properties for admin

export const getAdminPartnerAllProperties = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminPartnerAllPropertiesRequest",
    });

    const { data } = await axios.get(
      `${server}/property/all-partner-properties-admin/${id}`
    );

    dispatch({
      type: "getAdminPartnerAllPropertiesSuccess",
      payload: data.partnerAllProperties,
    });
  } catch (error) {
    dispatch({
      type: "getAdminPartnerAllPropertiesFailed",
      payload: error.response.data.message,
    });
  }
};
