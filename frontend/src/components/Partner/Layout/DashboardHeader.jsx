import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../Assests/logo/logo6.png";
const DashboardHeader = () => {
  const { partner } = useSelector((state) => state.partner);
  const img = logo;
  return (
    <div className="flex items-center justify-between full w-full px-4 bg-white z-30 fixed top-0 left-0 right-0 shadow h-[80px] ">
      <div>
        <Link to="/dashboard">
          <img src={img} alt="" className="h-[60px] sm:w-[150px] w-[110px]" />
        </Link>
      </div>
      <div className=" flex items-center">
        <div className=" flex items-center mr-8">
          <Link to="/dashboard-all-bookings" className="sm:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="sm:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/partner/${partner?._id}`}>
            <img
              src={`${partner?.avatar.url}`}
              alt=""
              className="h-[50px] w-[50px] rounded-full shadow border  border-teal-400 object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
