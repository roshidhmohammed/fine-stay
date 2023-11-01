import React from "react";
import "./Reviews.css";
import { AiFillStar } from "react-icons/ai";
import Footer from "../Layout/Footer";

const Reviews = ({ data }) => {
  const review = data && data.reviews;
  const ratingCalc = review && review.reduce((acc, num) => acc + num.rating, 0);
  return (
    data && (
      <div className="relative bg-[#EBE3E0] mb-0 md:mb-[35rem]  ">
        <div className="absolute md:flex   hidden left-[10%]  top-8 right-[10%]  ">
          <div className=" flex-auto bg-[#9ABDA5] font-Roboto   border-solid  rounded-lg shadow-md   p-2 lg:w-[25rem] w-[41rem] ">
            <p className="font-bold text-blue-700 hidden md:flex text-2xl  justify-between ">
              Reviews
              <p className="font-medium flex text-gray-900  ml-3  ">
                <AiFillStar className=" text-yellow-600  mt-1 mr-1   text-2xl " />
                {review.length > 0
                  ? (ratingCalc / review.length).toFixed(1)
                  : "no ratings"}{" "}
                _
                <p className="text-lg mt-1 ml-1  font-bold text-gray-600  ">
                  {" "}
                  based on {review.length} ratings
                </p>
              </p>
            </p>

            <div className="border-t mt-8 pt-3 font-Roboto">
              <p className=" font-semibold text-xl mb-2">
                What guests tell about this property?
              </p>
              <div className="Review-Details ">
                {data &&
                  data.reviews.map((review, index) => (
                    <div
                      className="border-2 bg-gray-200 rounded-md border-solid shadow-md  min-w-[15rem] max-w-[15rem] min-h-[15rem] max-h-[15rem] p-2  "
                      key={review._id}
                    >
                      <div className="flex font-Roboto border-b border-black ">
                        <p className="flex font-bold text-lg ">{review.user}</p>
                      </div>
                      <div className=" flex justify-start pt-2 ">
                        <p className=" text-[12px] underline underline-offset-1 text-blue-800 ">
                          {review.createdAt.slice(0, 10)}
                        </p>
                      </div>
                      <p className="font-normal font-Roboto text-md antialiased leading-relaxed text-justify pt-2">
                        {review.comment}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:hidden flex  absolute bg-[#EBE3E0]  top-[48rem] sm:top-[53rem] left-[0%] right-[0%]    ">
          <div className=" flex-auto mb-5  border-2 border-solid p-1 pl-2 pr-2 font-Roboto">
            <p className="font-bold text-xl flex justify-center text-blue-900 pb-2 pt-1 ">
              Reviews
            </p>

            <div className="border-t mt-3 font-Roboto pt-2">
              <p className=" font-bold sm:text-md text-sm">
                What guests tell about this property?
              </p>

              <div className="  mt-3 p-2  border-2 border-gray-500 rounded-md  h-[10rem] overflow-y-scroll">
                {data?.reviews.map((review, index) => (
                  <div className=" flex  flex-col border p-1  bg-gray-100 mb-2">
                    <div className=" flex justify-start font-Roboto font-bold text-lg  pl-1   ">
                      <div>{review.user}</div>
                    </div>
                    <div className=" flex justify-between px-2">
                      <div className="flex ">
                        {review.rating}{" "}
                        <AiFillStar
                          size={15}
                          color="#E9B824"
                          className="ml-1 mt-1"
                        />
                      </div>
                      <div className="text-[13px] text-blue-800">
                        {review.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <div className=" flex justify-start text-lg font-Roboto mt-2 px-2">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute top-[70rem] sm:top-[75rem] md:top-[85rem] left-0 right-0  md:hidden block">
          <Footer />
        </div>
      </div>
    )
  );
};

export default Reviews;
