import axios from "axios";
import { server } from "../../server";


export const getAllCategories = () => async(dispatch) =>{
    try {
        dispatch({
            type:"getAllCategoriesRequest"
        })
        const {data} = await axios.get(`${server}/categories/get-all-categories`,{withCredentials:true})
        dispatch({
            type:"getAllCategoriesSuccess",
            payload: data.allCategories
        })
        
    } catch (error) {
        dispatch({
            type:"getAllCategoriesFailed",
            payload: error.response.data.message
        })
    }
}