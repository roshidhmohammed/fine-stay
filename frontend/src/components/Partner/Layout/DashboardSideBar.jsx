import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBuildingAdd, BsListCheck } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdReorder } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="h-[90vh] overflow-y-scroll     bg-white shadow-sm  fixed  top-20   bottom-0  left-0 z-10">
      {/* single items */}
      <div className="w-full flex items-center p-4 ">
        <Link to="/dashboard" className="flex w-full items-center">
          <RxDashboard
            color={`${active === 1 ? "crimson" : "#555"}`}
            size={30}
          />
          <h5
            className={`sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link to="/dashboard-all-bookings" className="flex w-full items-center">
          <MdReorder color={`${active === 2 ? "crimson" : "#555"}`} size={30} />
          <h5
            className={`sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Bookings
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link
          to="/dashboard-create-property"
          className="flex w-full items-center"
        >
          <BsBuildingAdd
            color={`${active === 3 ? "crimson" : "#555"}`}
            size={30}
          />
          <h5
            className={`sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Add Property
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link
          to="/dashboard-get-all-properties"
          className="flex w-full items-center"
        >
          <BsListCheck
            color={`${active === 4 ? "crimson" : "#555"}`}
            size={30}
          />
          <h5
            className={`sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Your Added Properties
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link
          to="/dashboard-withdraw-money"
          className="flex w-full items-center"
        >
          <CiMoneyCheck1
            color={`${active === 5 ? "crimson" : "#555"}`}
            size={30}
          />
          <h5
            className={` sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link to="/dashboard-messages" className="flex w-full items-center">
          <BiMessageSquareDetail
            color={`${active === 6 ? "crimson" : "#555"}`}
            size={30}
          />
          <h5
            className={`sm:block hidden pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Messages
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
