import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "./reducers/user"
import {partnerReducer} from "./reducers/partner"
import { propertyReducer } from "./reducers/property";
import { userSearchReducer } from "./reducers/userSearchData";
import { couponReducer } from "./reducers/coupon";
import { amenitiesReducer } from "./reducers/amenities";
import { destinationReducer } from "./reducers/destination";
import { categoryReducer } from "./reducers/categories";
import { bookingsReducer } from "./reducers/booking";


const Store = configureStore({
    reducer:{
       user: userReducer,
       partner:partnerReducer,
       property:propertyReducer,
       search:userSearchReducer,
       coupon:couponReducer,
       amenities:amenitiesReducer,
       destination:destinationReducer,
       categories:categoryReducer,
       bookings:bookingsReducer,
    }
});

export default Store