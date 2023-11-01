import React, {  useState } from "react";
import { DateRange } from "react-date-range";
import { SlCalender } from "react-icons/sl";
import { BsFillPersonFill } from "react-icons/bs";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, addDays, parse } from "date-fns";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../../redux/actions/userSearchData";
import { HiLocationMarker } from "react-icons/hi";
import ProfilePage from "../ProfilePage/ProfilePage";

const SearchBar = ({ profiles, profileShow, setProfileShow }) => {
  const { search } = useSelector((state) => state.search);
  const { allProperties } = useSelector((state) => state.property);
  const [location, setLocation] = useState(search.place);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [adultCount, setAdultCount] = useState(parseInt(search.adultCount, 10));
  const [childrenCount, setChildrenCount] = useState(
    parseInt(search.adultCount, 10)
  );
  const [roomsCount, setRoomsCount] = useState(parseInt(search.adultCount, 10));
  const [openOptions, setOpenOptions] = useState(false);
  const [searchOption, setSearchOption] = useState(false);
  const [locationOption, setLocationOption] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setLocation(term);

    const filterLocation =
      allProperties &&
      allProperties.filter((place) =>
        place.currentLocation.placeName
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    setSearchData(filterLocation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        searchResults(location, date, roomsCount, adultCount, childrenCount)
      );
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

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

  const decrementAdultCount = () => {
    setAdultCount(adultCount - 1);
    if ((adultCount + childrenCount) % 4 === 1) {
      setRoomsCount(roomsCount - 1);
    }
  };
  const incrementAdultCount = () => {
    setAdultCount(adultCount + 1);
    if ((adultCount + childrenCount) % 4 === 0) {
      setRoomsCount(roomsCount + 1);
    }
  };

  const decrementChildrenCount = () => {
    setChildrenCount(childrenCount - 1);
    if ((adultCount + childrenCount) % 4 === 1) {
      setRoomsCount(roomsCount - 1);
    }
  };

  const incrementChildrenCount = () => {
    setChildrenCount(childrenCount + 1);
    if ((adultCount + childrenCount) % 4 === 0) {
      setRoomsCount(roomsCount + 1);
    }
  };

  const decrementRoomsCount = () => {
    setRoomsCount(roomsCount - 1);
  };

  const incrementRoomsCount = () => {
    setRoomsCount(roomsCount + 1);
  };

  return (
    <div className="   h-36 sm:h-0">
      <div className="relative bg-[#35633C] h-20  ">
        <form onSubmit={handleSubmit}>
          {!searchOption && (
            <div
              className="absolute sm:hidden top-3 w-auto bg-gray-100 right-[10%] left-[10%] border-[1px]  rounded-lg shadow-lg border-red-500   scale-100  "
              onClick={() => setSearchOption(!searchOption)}
            >
              <p className=" font-Roboto font-medium w-full pl-8 rounded-t-lg shadow-md p-2">
                Bangalore
              </p>
              <FiSearch className="absolute top-2 left-1 text-[1.5rem] text-blue-500" />
              <div className=" p-2  ">
                <SlCalender className=" text-[1.1rem]  absolute top-12 left-1 text-blue-600" />
                <p className="pl-5 text-[0.9rem] font-Roboto">
                  5 Jul - 6 jul (1night)
                </p>
              </div>
              <div className="bg-gray-200 p-2 flex rounded-b-lg shadow-md">
                <BsFillPersonFill className=" top-14 left-[1rem] text-[1.1rem]" />
                <p className=" text-[0.9rem]   top-1  pl-[0rem]  ">
                  6 Adults 2 Children
                </p>
              </div>
            </div>
          )}

          {/* mobile screen search bar options  */}

          {/* greater than sm screen  serachbar  */}

          <div className="absolute  mt-2   w-auto   right-[10%]  left-[10%]  bg-[#35633C] sm:grid grid-rows-4  p-0 lg:grid-rows-1 md:grid-rows-2   grid-flow-col gap-1   rounded border-solid shadow-md    ">
            <div className="flex items-start sm:mb-0 mb-1   border-0  rounded border-solid border-gray-100  ">
              <input
                className="  p-5 pl-2 w-full placeholder:text-slate-600 focus:outline-none focus:bg-[#f0e9e9]    text-gray-900  font-Roboto font-medium  border-0 rounded border-solid border-gray-100 bg-[#f0e9e9] hover:bg-[#bfb4b0] "
                placeholder={search.place}
                type="text"
                value={location}
                onChange={handleSearchChange}
                onClick={() => setLocationOption(!locationOption)}
              />
            </div>
            <div className="flex items-center sm:mb-0 mb-1 bg-[#f0e9e9] border-0 border-solid rounded border-gray-100 p-4 hover:bg-[#bfb4b0]">
              <SlCalender className="h-7 w-7  pr-1 " color="#00302D" />
              <span
                onClick={(e) => setIsOpenDate(!isOpenDate)}
                className="  text-gray-900  font-Roboto "
              >
                {`${formattedStartDate} to ${formattedEndDate}`}
              </span>
            </div>

            <div
              onClick={() => setOpenOptions(!openOptions)}
              className="  flex items-center bg-[#f0e9e9] sm:mb-0 mb-1  border-0 border-solid rounded border-gray-100 p-4 hover:bg-[#bfb4b0]"
            >
              <BsFillPersonFill className=" h-7 w-7  pr-1" color="#00302D" />
              <span className="text-gray-900  font-Roboto ">
                {`${
                  search.adultCount ? search.adultCount : adultCount
                } Adult . ${
                  search.childrenCount ? search.childrenCount : childrenCount
                } Children . ${
                  search.roomsCount ? search.roomsCount : roomsCount
                } Rooms`}
              </span>
            </div>

            <button
              type="submit"
              className="w-full  font-Roboto font-bold border-0 p-4 rounded border-solid bg-[#BE1568] text-xl   text-slate-100 hover:bg-pink-800"
            >
              Search
            </button>
          </div>
          {!locationOption &&
          location &&
          searchData &&
          searchData.length !== 0 ? (
            <div className="absolute  top-[5rem] left-20 max-h-[35vh] bg-white w-[30%] border-2 p-2 z-[9] rounded-md shadow-md">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    index <= 5 && (
                      <div
                        className="p-2 hover:bg-slate-300   flex  font-Roboto font-normal"
                        onClick={() =>
                          setLocation(i.currentLocation.placeName.split(",")[1])
                        }
                        key={index}
                      >
                        <h1 className="text-gray-900 flex font-Poppins font-medium ">
                          <HiLocationMarker className="mt-1 text-blue-600 mr-1" />
                          {i.currentLocation.placeName.split(",")[1]}{" "}
                        </h1>
                      </div>
                    )
                  );
                })}
            </div>
          ) : null}
        </form>
      </div>
      {isOpenDate && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={addDays(new Date(), 0)}
          className="absolute sm:right-[20%] z-[9999]  right-[10%] sm:left-[20%] left-[10%] mt-[3rem] "
        />
      )}
      {openOptions && (
        <div className=" md:mt-[3rem] md:left-[55%] z-[99999] md:right-[10%] pt-1 pb-1 w-[16rem] justify-around items-start  space-x-6 absolute flex  rounded  border-2 border-solid shadow-md bg-slate-50 border-slate-200">
          <div className="grid m-1 p-1  grid-rows-4 gap-6 grid-flow-col">
            <div className="  grid grid-cols-7 gap-5   items-center ">
              <span className="  text-md  font-Roboto font-medium col-span-4   ">
                Adults
              </span>
              <button
                onClick={decrementAdultCount}
                disabled={adultCount <= 1}
                className=" disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold   rounded-full  leading-normal     items-center border-solid border-0"
              >
                -
              </button>
              <span className=" font-medium font-Roboto col-span-1">{`${adultCount}`}</span>
              <button
                onClick={incrementAdultCount}
                disabled={adultCount + childrenCount >= 12}
                className=" outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold  col-span-1 rounded-full  leading-normal     items-center border-solid border-0"
              >
                +
              </button>
            </div>

            <div className=" grid grid-cols-7  gap-5  items-center ">
              <span className=" text-md  font-Roboto font-medium col-span-4 ">
                Children
              </span>
              <button
                className=" disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold   rounded-full  leading-normal     items-center border-solid border-0"
                onClick={decrementChildrenCount}
                disabled={childrenCount <= 0}
              >
                -
              </button>
              <span className="font-medium font-Roboto col-span-1">{`${childrenCount}`}</span>
              <button
                className="col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold   rounded-full  leading-normal     items-center border-solid border-0"
                onClick={incrementChildrenCount}
              >
                +
              </button>
            </div>
            <div className="  grid grid-cols-7 gap-5    items-center ">
              <span className=" text-md  font-Roboto font-medium  col-span-4 ">
                Rooms
              </span>
              <button
                onClick={decrementRoomsCount}
                disabled={roomsCount <= 1}
                className=" disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold  rounded-full  leading-normal     items-center border-solid border-0"
              >
                -
              </button>
              <span className="font-medium font-Roboto col-span-1 ">
                {`${roomsCount}`}
              </span>
              <button
                onClick={incrementRoomsCount}
                className=" col-span-1 outline outline-offset-4 outline-red-600   outline-2 text-xl font-bold  rounded-full   leading-normal     items-center border-solid border-0"
              >
                +
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="border-2 border-gray-500 hover:bg-red-900 rounded-lg bg-red-700 text-gray-100 font-Roboto font-semibold p-1"
                onClick={() => setOpenOptions(!openOptions)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-black fixed top-[7rem] right-[0%]  left-[0%]  md:right-[25%] md:left-[25%]     border-0 shadow-md rounded-md   z-[99999] ">
        {profileShow && (
          <ProfilePage
            profile={profiles}
            setProfileShow={setProfileShow}
            key={2}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
