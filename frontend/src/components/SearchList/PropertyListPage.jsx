import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { searchResults } from "../../redux/actions/userSearchData";
import { getAllProperties } from "../../redux/actions/property";

const PropertyListPage = ({
  minVal,
  maxVal,
  filterCategory,
  filterAmenities,
}) => {
  const { allProperties } = useSelector((state) => state.property);
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { searchs } = useParams();

  useEffect(() => {
    dispatch(getAllProperties());
    dispatch(searchResults(search));
  }, [dispatch, search]);

  let reviews;
  let ratingCalc;

  const isRoomExist =
    allProperties &&
    allProperties.filter(
      (property) =>
        property.roomsCount > 0 &&
        property.roomsCount >= search.roomsCount &&
        property.currentLocation.placeName.includes(search.place)
    );

  let filteredProperties = [];
  if (isRoomExist) {
    for (let i of isRoomExist) {
      const filterAm = i.amenities.filter((amenity) =>
        filterAmenities.includes(amenity)
      );
      const filterCat = filterCategory.filter((cat) => cat === i.category);
      const price = i.price >= minVal && i.price <= maxVal;
      if (filterCategory?.length > 0 && filterAmenities?.length > 0) {
        if (filterAm?.length > 0 && filterCat?.length > 0 && price) {
          filteredProperties.push(i);
        }
      } else if (filterCategory?.length > 0 || filterAmenities?.length > 0) {
        if ((filterAm?.length > 0 || filterCat?.length > 0) && price) {
          filteredProperties.push(i);
        }
      } else if (price) {
        filteredProperties.push(i);
      }
    }
  }

  const buttonStyle = {
    width: "50rem",
    background: "white",
    border: "0px",
  };

  const properties = {
    prevArrow: (
      <button className={`${buttonStyle}`}>
        <IoIosArrowBack className="w-6 h-6 bg-gray-100 rounded-2xl hover:bg-gray-300" />
      </button>
    ),
    nextArrow: (
      <button className={`${buttonStyle}`}>
        <IoIosArrowForward className="w-6 h-6 bg-gray-100 rounded-2xl hover:bg-gray-300" />
      </button>
    ),
  };
  return (
    <div className="">
      <div className=" md:pt-[0rem]  sm:pt-[6rem] pb-[5rem] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  grid-flow-row gap-8 border-0 border-gray-600  ml-[2rem]  mr-[2rem] md:ml-[6rem] mt-5 md:mr-[6rem]">
        {filteredProperties &&
          filteredProperties.map((property, index) => {
            reviews = property.reviews;
            ratingCalc = reviews.reduce((acc, num) => acc + num.rating, 0);
            return (
              <div
                key={index}
                className=" border-0 border-gray-600   rounded-md border-solid  "
              >
                <Slide
                  autoplay={false}
                  transitionDuration={500}
                  indicators={true}
                  infinite={false}
                  {...properties}
                >
                  {property.images.map((image, index) => (
                    <div className="relative " key={index}>
                      <img
                        key={index}
                        src={image.url}
                        alt=""
                        className="h-[19rem] w-full   rounded-lg shadow-lg   "
                      />

                      <div className="hidden absolute top-0 right-0 border-0  rounded-tr-md border-solid p-1 opacity-100 bg-gray-900  w-[1] h-[1] sm:flex items-start justify-end">
                        <AiFillStar className="mt-1 text-gray-100 " />
                        <p className="text-gray-100 text-center mt-0 font-bold pl-[0.1rem]  ">
                          {reviews.length > 0
                            ? (ratingCalc / reviews.length).toFixed(1)
                            : "0"}
                        </p>
                      </div>
                    </div>
                  ))}
                </Slide>

                <div className=" flex justify-start pl-[0.5rem]">
                  <p className="  text-lg font-Roboto font-semibold text-gray-950 mr-[8.9rem] pt-2 pb-1 ">
                    {property.propertyName}
                  </p>
                </div>

                <div className="flex justify-start pt-1  mb-1">
                  <HiLocationMarker
                    size={19}
                    className="ml-[0.20rem]  mb text-yellow-600"
                  />
                  <p className="mb-  font-Roboto font-medium tracking-wide text-sm md:text-md text-gray-800">
                    {property.currentLocation.placeName.split(",")[1]}
                  </p>
                </div>
                <div className="flex justify-between  pt-1">
                  <p className="text-md font-Roboto font-normal flex  mt-0 text-gray-950">
                    <FaRupeeSign className=" mt-1   ml-[0.50rem] " />
                    {property.price}
                  </p>
                  <Link to={`/Property-details/${property.propertyName}`}>
                    <button
                      className="   text-white font-bold  border border-solid rounded-md shadow bg-[#00302D] p-1 pl-2 tracking-wide font-Roboto pr-2 hover:bg-[#00302dce]"
                      type="button"
                    >
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PropertyListPage;
