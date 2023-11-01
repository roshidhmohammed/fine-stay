import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, addDays } from "date-fns";
import { animated, useSpring } from "react-spring";
import { HiLocationMarker } from "react-icons/hi";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../redux/actions/property";
import { useNavigate } from "react-router-dom";
import { searchResults } from "../../redux/actions/userSearchData";
import "../../components/Layout/BannerStyle.css";
import SearchByComponent from "./SearchByComponent";
import { server } from "../../server";
import axios from "axios";

const Banner = ({ profiles, profileShow, setProfileShow }, props) => {
  const navigate = useNavigate();
  const { allProperties } = useSelector((state) => state.property);
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [openOptions, setOpenOptions] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [locationOption, setLocationOption] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [bannerImg, setBannerImg] = useState();

  useEffect(() => {
    dispatch(getAllProperties());

    dispatch(
      searchResults(location, date, roomsCount, adultCount, childrenCount)
    );
  }, [dispatch]);

  useEffect(() => {
    axios.get(`${server}/banner/get-banner-img-user`).then((res) => {
      setBannerImg(res.data.userBannerImg);
    });
  }, []);
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
      navigate(`/Search-results/:${location}`);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const springs = useSpring({
    from: { x: -1600 },
    to: { x: 0 },
    config: { duration: 1000 },
    delay: { duration: 3000 },
  });

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
    <div className="  flex justify-center  bg-[#00302D]    h-[40rem]  opacity-100 ">
      <div className=" flex md:justify-between gap- justify-center mr-[rem] xl:-ml-[]   items-start mt-10">
        <div className="flex    sm:mt-20 px-2">
          <animated.h1
            className="md:text-[2rem] text-[2rem] lg:text-[3rem] text-[#EBE3E0] brightness-200 contrast-200 saturate-200 font-bold tracking-wider font-Roboto"
            style={springs}
          >
            Endless Destinations,
            <h1 className="md:text-[2rem] text-[2rem] lg:text-[3rem] text-[#EBE3E0] brightness-200 contrast-200 saturate-200 font-bold tracking-wider font-Roboto">
              One Booking
            </h1>
            <h3 className="  sm:text-[1rem] text-[0.5rem]   lg:text-[1rem] max-w-[30rem] pt-3 text-justify text-gray-500 leading-relaxed font-medium font-Roboto">
              Explore a world of possibilities with our one-stop booking
              platform. From bustling cities to tranquil getaways, find the
              perfect stay with ease. Your dream destination is just one booking
              away.
            </h3>
          </animated.h1>
        </div>
        <div className="image-container  sm:block hidden  ">
          <img src={bannerImg && bannerImg} alt="" className="" />
        </div>

        <div className="text-black fixed top-[7rem] right-[0%]  left-[0%]  md:right-[25%] md:left-[25%]     border-0 shadow-md rounded-md   z-[99999] ">
          {profileShow && (
            <ProfilePage
              profile={profiles}
              setProfileShow={setProfileShow}
              key={1}
            />
          )}
        </div>
      </div>

      <div className="absolute top-[35%]     ">
        {/* <SearchByComponent handleSubmit={handleSubmit} handleSearchChange={handleSearchChange} location={location} setLocationOption={setLocationOption} locationOption={locationOption} 
        setIsOpenDate={setIsOpenDate} isOpenDate={isOpenDate}  date={date} setOpenOptions={setOpenOptions} openOptions={openOptions} adultCount={adultCount} childrenCount={childrenCount} 
        roomsCount={roomsCount} searchData={searchData} setLocation={setLocation}
        /> */}
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
            <div className="absolute bottom-[0rem] top-[27rem] left-0 max-h-[35vh] bg-white w-[30%] border-2 p-2 z-[9] rounded-md shadow-md">
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
          className="absolute mr-[3rem] md:mt-[11.7rem] mt-[0rem]"
        />
      )}
      {openOptions && (
        <div className=" mt-[18.1rem] md:ml-[27rem] pt-1 pb-1 w-[16rem]   space-x-6 absolute flex  rounded  border-2 border-solid shadow-md bg-slate-50 border-slate-200">
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
                className="disabled:cursor-not-allowed outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold  col-span-1 rounded-full  leading-normal     items-center border-solid border-0"
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
                className="disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold   rounded-full  leading-normal     items-center border-solid border-0"
                onClick={incrementChildrenCount}
                disabled={adultCount + childrenCount >= 12}
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
                disabled
                className=" disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-2 outline-red-600 text-xl font-bold  rounded-full  leading-normal     items-center border-solid border-0"
              >
                -
              </button>
              <span className="font-medium font-Roboto col-span-1 ">
                {`${roomsCount}`}
              </span>
              <button
                onClick={incrementRoomsCount}
                disabled={roomsCount > 2}
                className="disabled:cursor-not-allowed col-span-1 outline outline-offset-4 outline-red-600   outline-2 text-xl font-bold  rounded-full   leading-normal     items-center border-solid border-0"
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
    </div>
  );
};

export default Banner;
