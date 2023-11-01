import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";

import { format, parse } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { BsFillPersonFill } from "react-icons/bs";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PropertyDescription = ({ data }) => {
  const { search } = useSelector((state) => state.search);
  const [adultCount, setAdultCount] = useState(
    search.adultCount ? search.adultCount : 1
  );
  const [childrenCount, setChildrenCount] = useState(
    search.childrenCount ? search.childrenCount : 0
  );
  const [roomsCount, setRoomsCount] = useState(
    search.roomsCount ? search.roomsCount : 1
  );

  const originalStartDate = search.startDate;
  const startDateWithoutTimezone = originalStartDate.replace(/GMT.*$/, "");
  const parsedStartDate = parse(
    startDateWithoutTimezone,
    "EEE MMM d yyyy HH:mm:ss",
    new Date()
  );
  const formattedStartDate = format(parsedStartDate, "dd/MM/yyyy");

  const originalEndDate = search.endDate;
  const endDateWithoutTimezone = originalEndDate.replace(/GMT.*$/, "");
  const parsedEndDate = parse(
    endDateWithoutTimezone,
    "EEE MMM d yyyy HH:mm:ss",
    new Date()
  );
  const formattedEndDate = format(parsedEndDate, "dd/MM/yyyy");

  const removeStartSlash = formattedStartDate.split("/");
  const removeEndSlash = formattedEndDate.split("/");

  // parse the date parts into date object (month is 0-based)
  const start = new Date(
    removeStartSlash[2],
    removeStartSlash[1] - 1,
    removeStartSlash[0]
  );
  const end = new Date(
    removeEndSlash[2],
    removeEndSlash[1] - 1,
    removeEndSlash[0]
  );

  // calculate time diff in milliseconds

  const daysDiff = Math.abs(start - end);
  // calc no of days by dividing milliseconds by milliseconds in a day
  const days = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)) + 1;

  const review = data && data.reviews;
  const ratingCalc = review && review.reduce((acc, num) => acc + num.rating, 0);

  return (
    <>
      {data ? (
        <div className=" ">
          <div className=" relative    hidden  md:flex   flex-wrap lg:ml-[10rem] ml-[5rem] lg:mr-0 mr-[5rem] mt-20 md:mt-6">
            <div className=" flex-auto bg-[#9ABDA5] border rounded-md border-solid w-[31rem]     font-Roboto lg:mr-[9.7rem] xl:mr-5 px-2">
              <p className="pl-1 text-2xl flex justify-between flex-wrap font-bold">
                {data.propertyName}
                <p className=" flex text-lg mr-1">
                  <AiFillStar className="mt-1 text-yellow-600 font-medium" />
                  {review.length > 0
                    ? (ratingCalc / review.length).toFixed(1)
                    : "no ratings"}{" "}
                  .
                  <p className=" font-Roboto font-normal text-sm mt-1 ml-1 text-gray-900">
                    {review.length} ratings
                  </p>
                </p>
              </p>

              <p className="flex  justify-between  text-lg font-medium">
                <p className="flex">
                  <HiLocationMarker className=" text-blue-900 font-bold mt-1 mr-1" />
                  {data.currentLocation.placeName}
                </p>
              </p>
              <div className=" mt-2 ml-2 border-t border-[#00302D] pt-1  ">
                <p className=" font-Roboto font-bold text-xl flex">
                  Description
                </p>
                <p className=" font-Roboto flex  text-md text-slate-950 antialiased leading-relaxed overflow-hidden text-justify mr-1">
                  {data.description}
                </p>
              </div>
              <div className=" hidden md:block mt-2 ml-2 border-t border-[#00302D] pt-1  pb-3">
                <p className="font-Roboto font-bold text-xl  border-b border-[#00302D] flex">
                  Amenities
                </p>
                <div className="flex-auto   mt-2 ">
                  <div className="text-3xl md:grid-cols-3 grid  lg:grid-cols-5 gap-2">
                    {data &&
                      data.amenities.map((amenity, index) => (
                        <div className="" key={amenity}>
                          {/* <Tb24Hours className="text-[#1c9d44] ml-6" /> */}
                          <p className=" text-[1rem] flex  text-gray-950  font-Roboto font-medium ">
                            {amenity}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 border-2 shadow-lg rounded-md  max-w-[45rem] lg:min-w-[20rem] min-w-[39rem] border-solid  mr-[10rem]  font-Roboto  pl-2 p-1 bg-gray-200 ">
              <p className="font-bold text-lg flex justify-between p-2">
                ₹ {data.price} / room
              </p>

              <div className="border-t border-[#00302D]  ">
                <div className=" font-Roboto p-2 mt-2  ">
                  <p className="font-medium flex mb-2 ">
                    <SlCalender className="mt-1 mr-1 font-bold" />
                    Check-in | Check-out
                  </p>
                  <p className="ml-3 mb-2">
                    {`${formattedStartDate} to ${formattedEndDate}`}
                  </p>
                </div>
                <div className="border-t p-2 border-[#00302D]">
                  <p className=" font-Roboto font-medium flex mb-2 mt-2">
                    <BsFillPersonFill className=" h-5 w-5  mr-1" />

                    {`${adultCount} Adult . ${childrenCount} Children . ${roomsCount} Rooms`}
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-[#00302D] border-solid p-2   font-Roboto font-medium">
                <p className="flex justify-between mt-1 mb-1">
                  {search.roomsCount * data.price} * {days} nights
                  <p className=" flex  pr-2">
                    ₹ {search.roomsCount * data.price * days}
                  </p>
                </p>
              </div>

              <div className="font-Roboto font-medium pl-2">
                <p className="flex justify-between mb-2">
                  GST(12%)
                  <p className="flex pr-4">
                    ₹ {((search.roomsCount * data.price * days) / 100) * 12}
                  </p>
                </p>
              </div>
              <div className="font-Roboto font-medium pl-2 pt-2 border-t border-[#00302D]">
                <p className="flex justify-between mt-2 mb-2">
                  Total
                  <p className="flex pr-4">
                    ₹{" "}
                    {search.roomsCount * data.price * days +
                      ((search.roomsCount * data.price * days) / 100) * 12}
                  </p>
                </p>
              </div>
              <Link to={`/Payment-Page/${data.propertyName}`}>
                <button className="border-0 border-solid font-Roboto font-bold tracking-wide  rounded-md text-lg  w-full p-2 mt-5 bg-[#00302D] hover:bg-[#00302dce] text-[#EBE3E0] shadow-md  ">
                  <p className="flex justify-center">Reserve Now</p>
                </button>
              </Link>
            </div>
          </div>
          {/* for mobile screen */}
          <div className="relative      flex  md:hidden   ">
            <div className="absolute sm:top-[34rem]     top-[25rem] left-[5%] right-[5%]">
              <div className="flex-auto bg-[#9ABDA5] border-solid border-2 p-1 rounded-md shadow-md ">
                <div className=" font-Roboto flex justify-between ">
                  <p className="text-2xl font-bold">{data?.propertyName}</p>
                  <p className="flex text-lg">
                    <AiFillStar className="mt-1  text-yellow-600" />
                    {data?.rating} ratings
                  </p>
                </div>
                <div className=" flex justify-between font-Roboto">
                  <p className="text-md flex font-medium ">
                    <HiLocationMarker className="mt-1  mr-1 text-blue-800" />

                    {data?.currentLocation.placeName.split(",")[1]}
                  </p>
                </div>
              </div>
              <div className="flex-auto bg-gray-200 border-solid border-2 font-Roboto  border-b rounded-md p-2 shadow-md mt-3">
                <p className="text-lg border-b border-[#00302D] font-medium pb-1">
                  ₹{data?.price} /night
                </p>
                <p className="text-lg font-normal flex justify-between    ">
                  {search.roomsCount * data.price} * {days} nights
                  <p className="text-md font-normal   ">
                    ₹{search.roomsCount * data.price * days}
                  </p>
                </p>

                <p className="text-lg font-normal flex justify-between pb-2">
                  Gst(12%)
                  <p className="text-md">
                    ₹{((search.roomsCount * data.price * days) / 100) * 12}
                  </p>
                </p>
                <div className="flex-auto font-Roboto  border-t border-[#00302D]  pt-1 pb-2   ">
                  <p className="text-md font-medium flex justify-between">
                    Total
                    <p className="text-md ">
                      ₹
                      {search.roomsCount * data.price * days +
                        ((search.roomsCount * data.price * days) / 100) * 12}
                    </p>
                  </p>
                </div>

                <Link to={`/Payment-Page/${data.propertyName}`}>
                  <div className="flex justify-center">
                    <button className=" mt-1 font-Roboto font-bold text-lg w-full p-2 bg-[#00302D] hover:bg-[#00302dce] tracking-wide text-[#EBE3E0] border-2 border-solid rounded-lg shadow-md ">
                      Reserve
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PropertyDescription;
