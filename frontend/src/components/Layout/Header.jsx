import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import logo from "../../Assests/logo/logo4.png";

const Header = ({ profiles, profileShow }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false);
  const img = logo;
  const param = useParams();

  const toggleNavBar = () => {
    setIsMenu(!isMenu);
  };
  return (
    <>
      <div className="bg-[#00302D] sticky top-0 right-0 left-0 z-[99999] ">
        <nav className="  flex justify-between items-center h-20  md:px-10 ">
          <div className="   ">
            <img src={img} alt="" className="h-[3rem]  mt-2 " />
          </div>
          <div className=" md:flex hidden md:gap-10 gap-3 tracking-wide mt-5">
            <p
              className={` ${
                param.a !== "about" && param.b !== "us" ? "border-b-2" : ""
              }   text-[20px] text-white font-Roboto font-medium     `}
            >
              <Link to="/">Home</Link>
            </p>
            <p
              className={`  ${
                param.a === "about" ? "border-b-2 " : ""
              } text-[20px] text-white font-Roboto font-medium  `}
            >
              <Link to="/about">About</Link>
            </p>
            <p
              className={` ${
                param.b === "us" ? "border-b-2 " : ""
              }  text-[20px] text-white font-Roboto font-medium `}
            >
              <Link to="/contact/us">Contact_us</Link>
            </p>
          </div>

          <div className="  hidden  md:flex mt-5  gap-5  ">
            <p className="rounded-lg text-lg font-Roboto  text-black font-medium   p-1  bg-[#EBE3E0] hover:bg-[#9ABDA5] px-2 hover:transition-all hover:duration-500 ">
              <Link to="/add-property">List your property</Link>
            </p>
            {!isAuthenticated && (
              <p className="rounded-lg  text-lg text-black p-1 font-Roboto font-medium bg-[#EBE3E0] px-2  hover:bg-[#9ABDA5] hover:transition-all hover:duration-500">
                <Link to="/login">Log in</Link>
              </p>
            )}

            <p className="">
              {isAuthenticated ? (
                <img
                  src={user?.avatar.url}
                  alt=""
                  className="rounded-full h-[35px] w-[35px] border-blue-500 border"
                  onClick={profiles}
                />
              ) : (
                <Link to="/login">
                  <CgProfile size={32} className=" mt-1 text-white" />
                </Link>
              )}
            </p>
          </div>

          <button
            className="md:hidden mx-10 "
            onClick={toggleNavBar}
            type="button"
          >
            <AiOutlineMenu
              className={`${isMenu ? "hidden" : "block"} h-8  w-8  text-white `}
            />
            <AiOutlineClose
              className={`${isMenu ? "block" : "hidden"} h-8  w-8 text-white`}
            />
          </button>
        </nav>

        <Transition
          show={isMenu}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="sm:block md:hidden   " ref={ref}>
              <div className="px-2 pt-0  mt-   pb-1 space-y-1  ">
                <p
                  className={` ${
                    param.a !== "about" && param.b !== "us" ? "border-b-2" : ""
                  }   rounded-md text-base text-center font-medium text-md text-gray-200 block  bg-teal-700  px-3 py-2 hover:bg-teal-900     `}
                >
                  <Link to="/">Home</Link>
                </p>
                <p
                  className={`  ${
                    param.a === "about" ? "border-b-2 " : ""
                  }rounded-md text-base text-center font-medium text-md text-gray-200 block  bg-teal-700  px-3 py-2 hover:bg-teal-900 `}
                >
                  <Link to="/about">About</Link>
                </p>
                <p
                  className={` ${
                    param.b === "us" ? "border-b-2 " : ""
                  }  rounded-md text-base text-center font-medium text-md text-gray-200 block  bg-teal-700  px-3 py-2 hover:bg-teal-900`}
                >
                  <Link to="/contact/us">Contact_us</Link>
                </p>
                {!isAuthenticated && (
                  <p className="rounded-md text-base text-center font-medium text-md text-gray-200 block  bg-teal-700  px-3 py-2 hover:bg-teal-900 ">
                    <Link to="/sign-up">Register</Link>
                  </p>
                )}
                {!isAuthenticated && (
                  <p className="rounded-md text-base font-medium text-center text-md text-gray-200 block bg-teal-700  px-3 py-2 hover:bg-teal-900 ">
                    <Link to="/login">Log in</Link>
                  </p>
                )}
                {isAuthenticated && (
                  <p
                    className="rounded-md text-base flex justify-center gap-1 font-medium text-center text-md text-gray-200  bg-teal-700  px-3 py-2 hover:bg-teal-900 "
                    onClick={profiles}
                  >
                    <img
                      src={user.avatar.url}
                      alt=""
                      className="rounded-full h-[25px] w-[25px] border-blue-500 border"
                    />
                    Profile
                  </p>
                )}

                {!isAuthenticated && (
                  <Link to="/login">
                    <p className="rounded-md mt-1 text-base flex justify-center gap-1 font-medium text-center text-md text-gray-200  bg-teal-700  px-3 py-2 hover:bg-teal-900 ">
                      <CgProfile size={28} className="  text-white " />
                      Profile
                    </p>
                  </Link>
                )}
                <p className="rounded-md text-base font-medium text-center text-md  text-gray-200 block bg-slate-900  px-3 py-2 hover:bg-teal-900">
                  <Link to="/add-property">List Your Property</Link>
                </p>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
};

export default Header;
