import axios from "axios";
import { server } from "../../server";

// get all bookings

export const getAllBookings = () => async(dispatch) =>{
try {
    dispatch({
        type:"getAllBookingsRequest"
    });
    const {data} = await axios.get(`${server}/booking/get-all-bookings`,{withCredentials:true})
    dispatch({
        type:"getAllBookingsSuccess",
        payload: data.allBookings
    })
    
} catch (error) {
    dispatch({
        type:"getAllBookingsFailed",
        payload: error.response.data.message,
    })
}
}