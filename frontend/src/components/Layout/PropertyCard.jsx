import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const d = property?.propertyName;
  const property_name = d?.replace(/\s+/g, "-");

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
    <div className=" border-0 border-gray-600   rounded-md border-solid  ">
      <Slide
        autoplay={false}
        transitionDuration={500}
        indicators={true}
        infinite={false}
        {...properties}
      >
        {property?.images.map((image, index) => (
          <div className="relative " key={image._id}>
            <img
              src={image?.url}
              alt=""
              className="h-[19rem] w-full   rounded-lg shadow-lg   "
            />

            <div className="hidden absolute top-0 right-0 border-0  rounded-tr-md border-solid p-1 opacity-100 bg-gray-900  w-[1] h-[1] sm:flex items-start justify-end">
              <AiFillStar className="mt-1 text-gray-100 " />
              <p className="text-gray-100 text-center mt-0 font-bold pl-[0.1rem]  ">
                {property.rating}
              </p>
            </div>
          </div>
        ))}
      </Slide>

      <div className=" flex justify-start pl-[0.5rem]">
        <p className="  text-lg font-Roboto font-semibold text-gray-950  pt-2 pb-1 ">
          {property?.propertyName}
        </p>
      </div>

      <div className="flex justify-start pt-1  mb-1">
        <HiLocationMarker
          size={19}
          className="ml-[0.20rem]  mb text-yellow-600"
        />
        <p className="mb-  font-Roboto font-medium tracking-wide text-sm md:text-md text-gray-800">
          {property?.currentLocation.placeName.split(",")[1]}
        </p>
      </div>
      <div className="flex justify-between  pt-1">
        <p className="text-md font-Roboto font-normal flex  mt-0 text-gray-950">
          <FaRupeeSign className=" mt-1   ml-[0.50rem] " />
          {property?.price}
        </p>
        <Link to={`/Property-details/${property_name}`}>
          <button
            className="   text-[#EBE3E0] font-bold   border-solid rounded-md shadow bg-[#00302D] p-1 pl-2 tracking-wide font-Roboto pr-2 hover:bg-[#00302dce]"
            type="button"
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
