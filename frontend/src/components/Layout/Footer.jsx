import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MdAddIcCall } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiTwitterFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className=" footer bg-gray-800 pb-2 ">
      {/* <div className="   border-b-[1px] border-gray-400 pb-[3rem]">
        <div className="">
          <p className="flex justify-center  font-Roboto md:text-[1.8rem] font-extrabold items-center text-[#fff9f9] tracking-wider pt-5">
            Subscribe To Our News Letter
          </p>
          <p className="hidden md:flex justify-center font-Roboto text-[1.5rem] font-light items-center tracking-wide pt-2 text-[#fff9f9]">
            Save time, Save money - we will get in touch with you!!!
          </p>
        </div>
        <form>
          <div className=" flex justify-center  ml-[1rem] mr-[1rem] md:mr-[30rem] md:ml-[30rem] mt-5   ">
            <div className="border-0 rounded-md border-gray-100 border-solid  ">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="pl-4 w-[10rem] md:w-[25rem] h-10 rounded-md font-Roboto text-slate-950 font-normal"
              />
            </div>

            <div className="border-0 rounded-md border-solid ml-1 sm:ml-2">
              <button className="bg-pink-600 w-[3rem] md:w-[10rem] md:text-[1.2rem] text-[0.6rem] rounded-md font-Roboto h-10  font-bold sm:tracking-wider hover:bg-pink-700 text-bg-800">
                Subscribe
              </button>
            </div>
            <p className=" underline text-gray-100"></p>
          </div>
        </form>
      </div> */}
      <div className=" flex sm:justify-between justify-center md:gap-20 px-28 pb-7">
        <div className="xl:block hidden">
          <div className=" mt-10 ">
            <p className=" font-Roboto flex justify-center font-semibold text-[2rem]  text-[#EBE3E0] ">
              Fine Stay
            </p>
            <p className=" mt-2 font-Roboto font-normal text-[1.2rem] text-justify w-[20rem] leading-relaxed text-[#fff9f9]">
              Moreover, hotel booking websites often feature customer reviews
              and ratings, allowing users to gain insights from previous guests'
              experiences.
            </p>
          </div>
        </div>
        <div className="">
          <div className="mt-12 ">
            <p className=" font-Roboto flex justify-center font-semibold sm:text-[2rem] text-[1.3rem]  text-[#ec3c3c]">
              Connect Us
            </p>
            <ul className=" list-none text-[#fff9f9] mt-5">
              <li>
                <HiLocationMarker className="text-[1.2rem] " />
                <p className="-mt-6 ml-6 sm:text-[1.2rem] text-[1rem]">
                  Trivandrum, Kerala, India
                </p>
              </li>
              <li className="mt-4">
                <MdAddIcCall className="text-[1.2rem]" />
                <p className="-mt-6 ml-7 sm:text-[1.2rem] text-[1rem] ">
                  +91 1234567890
                </p>
              </li>
              <li className="mt-4">
                <HiOutlineMail className="text-[1.2rem]" />
                <p className="-mt-6  ml-7 sm:text-[1.2rem] text-[1rem] ">
                  roshidhmohammed11@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="mt-12">
            <p className="font-Roboto font-semibold sm:text-[1.5rem] text-[0.7rem] pl-9 text-[#f01fa0]">
              Social Media
            </p>
            <ul className=" list-none text-[#fff9f9] mt-5 ml-[3rem]">
              <li className="">
                <RiTwitterFill className="text-[2rem]  text-blue-500" />
                <p className="sm:-mt-7 -mt-5  ml-9 sm:text-[1.2rem] text-[0.6rem] font-Roboto font-normal">
                  Twitter
                </p>
              </li>
              <li className="mt-4 ">
                <BsLinkedin className="text-[1.8rem] text-sky-500" />
                <p className="sm:-mt-6 -mt-4 ml-9 sm:text-[1.2rem] text-[0.6rem] font-Roboto font-normal">
                  Linked_in
                </p>
              </li>
              <li className="mt-4 ">
                <BsInstagram className="text-[1.8rem] text-pink-600" />
                <p className="sm:-mt-6 -mt-3 ml-9 sm:text-[1.2rem] text-[0.6rem] font-Roboto font-normal">
                  Instagram
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-b-[1px] border-gray-300"></div>
      <div className="flex justify-center items-center mt-2">
        <p className=" font-Roboto font-normal sm:text-[1.3rem] text-[0.5rem] text-[#bab8b8]">
          copyright@2023 Mohammed Roshidh | All Rights Reserved
        </p>
      </div>
      <div className="sm:hidden flex justify-center gap-5 mt-4">
        <BsInstagram className="text-[1.5rem]  text-pink-600" />
        <BsLinkedin className="text-[1.5rem] text-sky-600" />
        <RiTwitterFill className="text-[1.5rem] text-blue-500" />
      </div>
    </div>
  );
};

export default Footer;
