import React, { useEffect, useState } from "react";
import { TbCircleArrowLeftFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../redux/actions/property";
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

const PartnerPropertyView = ({ setPropertyShow, propId }) => {
  const dispatch = useDispatch();
  const { allProperties } = useSelector((state) => state.property);
  const [imgCount, setImgCount] = useState(0);

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  const selectedProp = allProperties?.filter((item) => item._id === propId);
  console.log(selectedProp);

  const handleImgDecrem = () => {
    setImgCount(imgCount - 1);
  };

  const handleImgIncrem = () => {
    setImgCount(imgCount + 1);
  };
  return (
    <>
      <div className=" mt-3 lg:pl-0 pl-8">
        <div className=" flex justify-start ">
          <TbCircleArrowLeftFilled
            size={30}
            onClick={() => setPropertyShow(false)}
          />
        </div>
        <div className=" flex border mt-5">
          <div className=" flex gap-4 md:justify-between justify-start md:flex-nowrap flex-wrap">
            <div>
              <div className=" relative ">
                <img
                  src={selectedProp && selectedProp[0].images[imgCount]?.url}
                  alt=""
                  className=" sm:min-w-[250px] min-h-[40px] min-w-[40px] sm:min-h-[250px] sm:max-w-[250px] sm:max-h-[250px] bg-contain"
                />
                {imgCount > 0 && (
                  <div className=" absolute top-[40%] left-0">
                    <AiFillCaretLeft
                      color="white"
                      size={28}
                      onClick={() => handleImgDecrem()}
                    />
                  </div>
                )}
                {selectedProp &&
                  imgCount >= 0 &&
                  imgCount < selectedProp[0].images?.length - 1 && (
                    <div className=" absolute top-[40%] right-0">
                      <AiFillCaretRight
                        color="white"
                        size={28}
                        onClick={() => handleImgIncrem()}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div>
              <div className=" flex flex-col gap-2">
                <div className=" font-Roboto font-medium text-[15px] sm:text-[22px]">
                  {selectedProp && selectedProp[0].propertyName}
                </div>
                <div className=" font-Roboto flex text-[10px]  sm:text-[18px]">
                  <MdLocationOn size={20} color="blue" className=" mt-1 mr-1" />
                  {selectedProp && selectedProp[0].currentLocation.placeName}
                </div>
                <div className=" font-Roboto sm:flex pr-2  hidden  text-[16px]">
                  <p className=" font-medium  mr-1 text-[18px]">Description:</p>
                  {selectedProp && selectedProp[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-1 mt-2">
          <div className=" font-Roboto flex   text-[18px]">
            <p className=" font-medium mr-1">Total Images Count:</p>
            {selectedProp && selectedProp[0].images?.length}
          </div>
          <div className=" font-Roboto flex   text-[18px]">
            <p className=" font-medium mr-1">Price:</p>
            {selectedProp && selectedProp[0].price}
          </div>
          <div className=" font-Roboto flex   text-[18px]">
            <p className=" font-medium mr-1">Current No of Rooms:</p>
            {selectedProp && selectedProp[0].roomsCount}
          </div>
          <div className=" font-Roboto flex text-[10px]  sm:text-[18px]">
            <h1 className=" font-medium mr-1">Amenities:</h1>
            {selectedProp &&
              selectedProp[0].amenities?.map((amenity) => (
                <h1 className=" align-top">{amenity} ,</h1>
              ))}
          </div>
          <div className=" font-Roboto flex   text-[18px]">
            <p className=" font-medium mr-1 text-blue-800">Rating:</p>
            {selectedProp && selectedProp[0].rating}
          </div>
          <div className=" font-Roboto flex   text-[18px]">
            <p className=" font-medium mr-1 text-emerald-800">Listed On:</p>
            {selectedProp && selectedProp[0].createdAt.slice(0, 10)}
          </div>
        </div>
        <div className=" flex flex-col mt-5 pb-5 bg-gray-200">
          <div className=" flex justify-center font-Roboto text-lg font-medium py-2">
            Reviews
          </div>
          <div className="h-[25vh] overflow-y-scroll">
            {selectedProp &&
              selectedProp[0].reviews.map((review) => (
                <div className="  mx-10 px-2 bg-white  rounded-lg mb-2 overflow-y-scroll">
                  <div className=" border-b sm:py-2 font-Roboto font-medium sm:text-[20px] flex justify-start">
                    {review.user}
                  </div>
                  <div className=" sm:py-2 font-Roboto sm:text-[15px] text-blue-800  flex justify-end">
                    <p>{review.createdAt.slice(0, 10)}</p>
                  </div>
                  <div className=" sm:pt-2 font-Roboto sm:pl-3 text-[17px]  flex justify-start">
                    {review.rating}
                    <AiFillStar
                      color="#E68815"
                      size={19}
                      className=" mt-1 ml-"
                    />
                  </div>
                  <div className=" sm:py-2 font-Roboto sm:pl-8  flex justify-start">
                    {review.comment}
                  </div>
                </div>
              ))}
            {selectedProp && selectedProp[0].reviews.length === 0 && (
              <div className=" flex justify-center mt-10 font-Roboto font-medium items-center ">
                No reviews yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerPropertyView;
