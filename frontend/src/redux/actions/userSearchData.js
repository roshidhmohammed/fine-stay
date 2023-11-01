import axios from "axios";
import {server} from "../../server"

// load search

export const searchResults = (location,date, roomsCount, adultCount, childrenCount) => async (dispatch) => {
    try {
        dispatch({
            type:"searchCreateRequest",
        })
const params = new URLSearchParams({
    place:location,
    startDate:date[0].startDate,
    endDate:date[0].endDate,
    roomsCount:roomsCount,
    adultCount:adultCount,
    childrenCount:childrenCount

})
const url = `${server}/property/search-properties?${params}`
        const {data} = await axios.get(url)

        dispatch({
            
            type:"searchCreateSuccess",
            payload:data.searchData,
            
        });
        localStorage.setItem("searchResults", JSON.stringify(data.searchData))
        
        
    } catch (error) {
        dispatch({
            type:"searchCreateFail",
            payload: error.response.data.message
        })
        
    }
}