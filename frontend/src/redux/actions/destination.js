import axios from "axios";
import { server } from "../../server";


export const getAllDestination = () => async(dispatch)=>{
    try {
        dispatch({
            type:"getAllDestinationRequest"
        })
        const {data}= await axios.get(`${server}/topDestination/get-all-destination`)
        dispatch({
            type:"getAllDestinationSuccess",
            payload: data.allDestination
        })
        
    } catch (error) {
        dispatch({
            type:"getAllDestinationFailed",
            payload:error.response.data.message,
        })
    }
}