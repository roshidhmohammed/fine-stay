import React, { useEffect, useState } from "react";
// import "react-image-gallery/styles/css/image-gallery.css";
import { BiGridAlt } from "react-icons/bi";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../redux/actions/property";

const PropertyImage = ({ data }) => {
  const [slideOpen, setSlideOpen] = useState(false);
  const [slideCount, setSlideCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  return (
    <>
      {data ? (
        <div className="relative  mt-[3rem] ">
          <div className="hidden md:block  relative lg:pl-40 lg:pr-40 px-20 mb-0  ">
            {slideOpen && (
              <div className=" sticky   mt-10 top-[0%] left-[30%]    z-[999]">
                <div className="absolute  right-[30%]  bg-slate-900  bg-opacity-50">
                  <AiOutlineClose
                    className="text-2xl bg-white rounded-md text-black "
                    onClick={() => setSlideOpen(!slideOpen)}
                  />
                  <img
                    src={data.images[slideCount].url}
                    alt=""
                    className="h-[30rem]  w-[30rem] m-4 mr-10 ml-10"
                  />
                  {slideCount > 0 && (
                    <button
                      className="absolute left-[0%] rounded-full bg-white hover:bg-slate-200 p-1 border-solid top-1/2"
                      onClick={() => setSlideCount(slideCount - 1)}
                    >
                      <BiLeftArrow className="text-2xl  text-black " />
                    </button>
                  )}

                  {slideCount < data.images.length - 1 && (
                    <button
                      className="absolute right-[0%] rounded-full bg-white hover:bg-slate-200 p-1 border-solid top-1/2"
                      onClick={() => setSlideCount(slideCount + 1)}
                    >
                      <BiRightArrow className="text-2xl  text-black " />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4  gap-2">
              {/* First Image */}
              <div className="row-span-2 col-span-2  ">
                <img
                  src={data.images[0].url}
                  alt=""
                  className="w-full h-[71vh] rounded-md "
                />
              </div>

              {/* Remaining Images */}
              {data.images.slice(1, 5).map((image, index) => (
                <div key={index} className="row-span-1 col-span-1">
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-[35vh] rounded-md"
                  />

                  {index === 3 && (
                    <button
                      className="flex  absolute bottom-[4%] right-[17%] bg-[#00302D] hover:bg-[#35633C] border-solid border-[1px] shadow-md  rounded-lg pl-1 pr-1 py-1 border-black"
                      onClick={() => setSlideOpen(!slideOpen)}
                    >
                      <BiGridAlt className=" font-Roboto text-lg mt-1 text-[#EBE3E0] font-medium mx-1" />
                      <p className=" font-Roboto font-medium text-md text-[#EBE3E0] ">
                        show all images
                      </p>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* mobile screen */}
          <div className="block md:hidden relative">
            <div className="absolute w-auto flex-auto justify-center  ">
              <img
                src={data.images[slideCount].url}
                alt=""
                className="h-full  w-full"
              />
              {slideCount > 0 && (
                <button
                  className="absolute left-[0%] rounded-[50%] bg-slate-100 hover:bg-slate-200 p-1 border-solid top-1/2"
                  onClick={() => setSlideCount(slideCount - 1)}
                >
                  <BiLeftArrow className="text-2xl bg-white text-black " />
                </button>
              )}

              {slideCount < data.images.length - 1 && (
                <button
                  className="absolute right-[0%] rounded-[50%] bg-white p-1 border-solid top-1/2"
                  onClick={() => setSlideCount(slideCount + 1)}
                >
                  <BiRightArrow className="text-2xl  text-black " />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PropertyImage;
