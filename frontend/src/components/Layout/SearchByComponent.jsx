import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { format, addDays } from "date-fns";



const SearchByComponent = ({handleSubmit, handleSearchChange, location,setLocationOption, locationOption, 
    setIsOpenDate, isOpenDate, date, setOpenOptions, openOptions, adultCount,  childrenCount, roomsCount, 
    searchData, setLocation
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className=" md:my-[22rem] my-[10rem]  bg-teal-600 grid grid-rows-4    md:grid-rows-1   grid-flow-col gap-1 sm:border-4 rounded border-solid shadow-md  border-teal-600  ">
            <div className="flex items-start  border-0  rounded border-solid border-gray-100 ">
              <input
                className="  p-5   min-w-[17rem]   text-gray-900  placeholder:text-slate-600 focus:outline-none focus:bg-[#f0e9e9] font-Roboto font-medium  border-0 bg-[#f0e9e9] rounded border-solid border-gray-100 hover:bg-[#bfb4b0] "
                placeholder="Where is your destination ?"
                type="search"
                value={location}
                onChange={handleSearchChange}
                onClick={() => setLocationOption(!locationOption)}
              />
            </div>
            <div className="flex items-center bg-[#f0e9e9] border-0 border-solid rounded border-gray-100 p-4 hover:bg-[#bfb4b0] ">
              <FaRegCalendarAlt className="h-7 w-7  pr-1 " color="#00302D" />
              <span
                onClick={() => setIsOpenDate(!isOpenDate)}
                className="  text-gray-900 font-Roboto lg:w-[15rem] "
              >
                {`${format(date[0].startDate, "dd/MM/yyyy")} To ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )} `}
              </span>
            </div>

            <div
              onClick={() => setOpenOptions(!openOptions)}
              className="  flex items-center bg-[#f0e9e9]  border-0 border-solid rounded border-gray-100 p-4 hover:bg-[#bfb4b0] "
            >
              <BsFillPersonFill className=" h-7 w-7  pr-1" color="#00302D" />
              <span className="text-gray-900  font-Roboto min-w-[13rem]  ">
                {`${adultCount} Adult . ${childrenCount} Children . ${roomsCount} Rooms`}
              </span>
            </div>

            <button
              type="submit"
              className=" lg:w-[10rem] font-Roboto font-bold border-0 p-4 rounded border-solid bg-[#BE1568] text-xl   text-slate-100 hover:bg-pink-800"
            >
              Search
            </button>
          </div>
          {!locationOption &&
          location &&
          searchData &&
          searchData.length !== 0 ? (
            <div className="absolute bottom-[0rem] left-0 min-h-[30vh] bg-white w-[30%] border-2 p-2 z-[9] rounded-md shadow-md">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <div
                      className="p-2 hover:bg-slate-300   flex  font-Roboto font-normal"
                      onClick={() => setLocation(i.currentLocation.placeName)}
                      key={index}
                    >
                      <HiLocationMarker className="mt-1 text-blue-600 mr-1" />
                      <h1 className="text-gray-900">
                        {i.currentLocation.placeName}{" "}
                      </h1>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </form>
    </div>
  )
}

export default SearchByComponent
