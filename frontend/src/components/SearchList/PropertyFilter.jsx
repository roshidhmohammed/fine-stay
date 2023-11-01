import React, { useState, useRef, useCallback, useEffect } from "react";
import "./priceRange.css";
import PropTypes from "prop-types";
import { AiOutlineFilter } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllAmenities } from "../../redux/actions/amenities";
import { getAllCategories } from "../../redux/actions/categories";

const PropertyFilter = ({
  setShowFilterModal,
  showFilterModal,
  isApply,
  setIsApply,
  filterAmenities,
  filterCategory,
  setFilterAmenities,
  setFilterCategory,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  min,
  max,
  onChange,
}) => {
  const { allAmenities } = useSelector((state) => state.amenities);
  const { allCategories } = useSelector((state) => state.categories);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAmenities());
    dispatch(getAllCategories());
  }, [showFilterModal, dispatch]);

  const handleCategoryinput = (e) => {
    const checkedCategory = e.target.value;

    if (filterCategory.includes(checkedCategory)) {
      setFilterCategory(
        filterCategory.filter((value) => value !== checkedCategory)
      );
    } else {
      setFilterCategory([...filterCategory, checkedCategory]);
    }
  };

  const handleAmenitiesInput = (e) => {
    const checkboxAmenities = e;
    if (filterAmenities.includes(checkboxAmenities)) {
      setFilterAmenities(
        filterAmenities.filter((value) => value !== checkboxAmenities)
      );
    } else {
      setFilterAmenities([...filterAmenities, checkboxAmenities]);
    }
  };

  const getPercentage = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // set width of the  range to decrease from left side

  useEffect(() => {
    const minPercent = getPercentage(minVal);
    const maxPercent = getPercentage(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercentage]);

  //  set width of the  range to decrease from right side

  useEffect(() => {
    const minPercent = getPercentage(minValRef.current);
    const maxPercent = getPercentage(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercentage]);

  // get min and max val when their state changes

  // useEffect(() => {
  //   // onChange({min:minVal, max:maxVal});
  //   // console.log("min:", minVal, " max:", maxVal);
  // }, [minVal, maxVal, onChange]);

  // set the type of each prop
  PropertyFilter.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <div>
      <div
        className="flex justify-end mr-[6.5rem]  mt-[9rem]   lg:mt-[8rem]"
        onClick={() =>
          dispatch(getAllAmenities()) && dispatch(getAllCategories())
        }
      >
        <button
          className="flex font-Roboto font-medium shadow-lg  text-gray-950 border-2 border-solid border-gray-300 rounded-[0.6rem] tracking-wide bg-white hover:bg-red-600 p-3 "
          onClick={() => setShowFilterModal(!showFilterModal)}
        >
          <AiOutlineFilter className="mt-1 mr-1 text-gray-900 font-Roboto font-semibold text-[1.1rem]  " />
          Filters
        </button>
      </div>

      {showFilterModal && (
        <div className="flex justify-center  items-start overflow-x-hidden  overflow-y-scroll fixed  inset-0  z-50 outline-none focus:outline-none ">
          <div className="relative w-auto  my-6 mx-auto max-w-6xl">
            <div className="border-0 top-20  rounded-lg  shadow-lg relative flex flex-col  w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center  justify-center p-5 border-b border-solid  border-slate-200 rounded-t">
                <h3 className="font-Roboto font-bold  text-gray-900 text-3xl">
                  Filters
                </h3>
              </div>
              {/* price range */}
              <div className="relative flex-auto p-6 ">
                <p className="flex justify-start font-Roboto items-center font-bold text-xl ">
                  Price Range
                </p>
                <div className="mt-4">
                  <form>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={minVal}
                      onChange={(event) => {
                        const value = Math.min(
                          Number(event.target.value),
                          maxVal
                        );
                        setMinVal(value);
                        minValRef.current = value;
                      }}
                      className="thumb thumb--left"
                      style={{ zIndex: minVal > max - 100 && "5" }}
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={maxVal}
                      onChange={(event) => {
                        const value = Math.max(
                          Number(event.target.value),
                          minVal
                        );
                        setMaxVal(value);
                        maxValRef.current = value;
                      }}
                      className="thumb thumb--right"
                    />
                    <div className="slider ">
                      <div className=" slider__track" />
                      <div ref={range} className="slider__range" />
                    </div>
                  </form>
                </div>
                <div className="mt-10 flex justify-center sm:w-full">
                  <div className=" font-Roboto font-semibold border-2 p-1 sm:w-full w-28 rounded-md shadow-md ">
                    Min Price
                    <p className="font-normal ">₹ {minVal}</p>
                  </div>
                  <p className=" font-Roboto font-semibold flex items-center m-1 text-[1.3rem]">
                    -
                  </p>

                  <div className="font-Roboto font-semibold sm:w-full  w-28 border-2 p-1 rounded-md shadow-md">
                    Max Price
                    <p className=" font-normal">₹ {maxVal}</p>
                  </div>
                </div>
              </div>

              <div className="border-t   relative p-6 border-solid border-slate-200 rounded-b ">
                <p className="flex items-center sm:justify-start justify-center font-Roboto font-bold text-xl">
                  Category Type
                </p>

                <div className="grid grid-cols-2 mt-5  gap-2 ">
                  {allCategories &&
                    allCategories.map((item, index) => {
                      return (
                        <div
                          className="flex font-Roboto font-normal text-md items-center justify-center sm:justify-start"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            checked={filterCategory?.includes(
                              item.categoryName
                            )}
                            value={item.categoryName}
                            onChange={handleCategoryinput}
                          />
                          <span className="ml-1">{item.categoryName}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t relative p-6 border-solid border-slate-200 rounded-b ">
                <p className="flex items-center justify-center sm:justify-start font-Roboto font-bold text-xl">
                  Amenities
                </p>
                <div className="grid sm:grid-cols-3 grid-cols-2 mt-5 mx-10 sm:mx-0 gap-2 ">
                  {allAmenities &&
                    allAmenities.map((item, index) => {
                      return (
                        <div
                          className="flex font-Roboto font-normal text-md items-center justify-start"
                          key={item._id}
                        >
                          <input
                            type="checkbox"
                            checked={filterAmenities?.includes(
                              item.AmenitiesName
                            )}
                            onClick={() =>
                              handleAmenitiesInput(item.AmenitiesName)
                            }
                          />
                          <span className="ml-1">{item.AmenitiesName}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* footer */}
              <div className="border-t flex justify-end relative px-20 py-6 sm:p-6 border-solid border-slate-200 rounded-b ">
                <button
                  className="font-Roboto font-normal text-[#f8f6f6] text-lg border-0 mr-1 shadow-md tracking-wide bg-[#00302D] hover:bg-[#00302dce] rounded-md px-2 py-1"
                  onClick={() => setShowFilterModal(!showFilterModal)}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilter;
