import React, { useEffect, useState } from "react";
import "./destination.css";
import "react-slideshow-image/dist/styles.css";
// import { propertyData } from "../../static/data";
import PropertyCard from "./PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../redux/actions/property";

const TopRatedProperties = () => {
  const { allProperties } = useSelector((state) => state.property);
  const [currentDistrict, setCurrentDistrict] = useState("");
  const dispatch = useDispatch();
  // const highRatedProp =
  //   propertyData && propertyData.sort((a, b) => b.rating - a.rating);

  // const highRatedPropFilter = highRatedProp.filter(
  //   (current, index, arr) => index <= 3
  // );

  useEffect(() => {
    dispatch(getAllProperties());

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESSTOKEN}`
        );
        const data = await response.json();
        const place = data.features[0];
        const district = place.context.find((context) =>
          context.id.startsWith("district")
        ).text;
        setCurrentDistrict(district);
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, [dispatch]);

  const currentPlaceProp = allProperties?.filter((item, index) =>
    item.currentLocation.placeName.includes(currentDistrict)
  );

  const sortedPropByRating = currentPlaceProp?.sort(
    (a, b) => b.rating - a.rating
  );

  let first4prop = [];

  if (sortedPropByRating?.length >= 1) {
    for (let i = 0; i <= 3; i++) {
      first4prop.push(currentPlaceProp[i]);
    }
  }

  return (
    <div className="bg-[#9ABDA5] pb-[5rem] ">
      <div className="flex justify-center flex-wrap  items-center  pt-10 ">
        <p className="sm:text-[2rem] text-[1rem] font-Roboto font-extrabold sm:tracking-wider text-gray-950">
          Top Rated Properties
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  grid-flow-row gap-8 border-0 border-gray-600  ml-[2rem]  mr-[2rem] md:ml-[6rem] mt-5 md:mr-[6rem]">
        {first4prop?.map((property, index) => (
          <PropertyCard key={property?._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedProperties;
