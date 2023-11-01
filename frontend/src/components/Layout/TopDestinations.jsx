import React, { useEffect } from "react";
import "./destination.css";
import { HiLocationMarker } from "react-icons/hi";
import { RiHotelLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestination } from "../../redux/actions/destination";
import { getAllProperties } from "../../redux/actions/property";

const TopDestinations = () => {
  const { allDestination } = useSelector((state) => state.destination);
  // const { allProperties } = useSelector((state) => state.property);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDestination());
    dispatch(getAllProperties());
  }, [dispatch]);

  return (
    <div className="bg-[#EBE3E0]   ">
      <div className="flex justify-center items-center  pt-10">
        <p className="md:text-[2rem] text-[1rem] font-Roboto tracking-wider text-gray-950  font-extrabold  hover:ease-in ">
          Popular Destinations In India
        </p>
      </div>
      <div className="destination-custom ">
        {allDestination &&
          allDestination.map((item, index) => (
            <div className=" border-solid   contrast-125 rounded  border-0 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105  md:max-h-[24rem] max-h-[13rem] md:min-h-[24rem] min-h-[13rem] m-5 md:max-w-[30rem] mx-w-md md:min-w-[14rem] min-w-[8rem] snap-center">
              <div>
                <img
                  src={item.image}
                  alt=""
                  className="md:h-[17rem] h-[9.5rem] rounded-2xl md:w-[15rem] w-[8.5rem]   "
                />
              </div>

              <div className="">
                <p className="md:text-xl text-md font-Roboto font-semibold  text-gray-950 p-2  flex items-center justify-center  ">
                  {item.destination}
                </p>

                <p className=" pl-7  text-sm md:text-md font-Roboto font-medium text-gray-800">
                  {item.placeName}
                </p>
                <HiLocationMarker className="-mt-5 ml-2 text-blue-800 " />

                <p className="hidden md:flex justify-end items-start -mt-[1.3rem] font-Roboto font-normal  pr-2 text-gray-700">
                  {/* {allProperties && allProperties[index].currentLocation.placeName.match(/Bengaluru/g)? 4:1} */}
                  100
                </p>
                <RiHotelLine className="ml-[10.4rem] -mt-[1.4rem] h-5 w-5 text-red-800 hidden md:block" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopDestinations;
