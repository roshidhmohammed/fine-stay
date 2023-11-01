import React from "react";
import { BiCategoryAlt, BiUserCheck } from "react-icons/bi";
import { BsListCheck } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdFormatListBulletedAdd, MdTravelExplore } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/actions/user";

const SideNavbar = ({ active }) => {
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="  h-[90vh] bg-[#0a0429]  shadow-sm  overflow-y-scroll fixed   top-[5rem] left-0 z-10">
        {/* single items */}
        <div className="w-full   flex items-center p-4 ">
          <Link to="/admin-dashboard" className="flex w-full items-center">
            <RxDashboard
              color={`${active === 1 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden font-Roboto pl-2 text-[18px] font-[500]  ${
                active === 1 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Dashboard
            </h5>
          </Link>
        </div>

        <div
          className="w-full flex items-center p-4 "
          onClick={() => dispatch(getAllUsers())}
        >
          <Link
            to="/admin-users-management"
            className="flex w-full items-center"
          >
            <div className="flex w-full items-center">
              <BiUserCheck
                color={`${active === 2 ? "crimson" : "#555"}`}
                size={30}
              />
              <h5
                className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                  active === 2 ? "text-[crimson]" : "text-gray-400"
                }`}
              >
                Users Management
              </h5>
            </div>
          </Link>
        </div>

        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-partners-management"
            className="flex w-full items-center"
          >
            <FaRegHandshake
              color={`${active === 3 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden   pl-2 text-[18px] font-Roboto font-[500] ${
                active === 3 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Partners Management
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-listed-properties"
            className="flex w-full items-center"
          >
            <BsListCheck
              color={`${active === 4 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 4 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Listed Properties
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-coupon-management"
            className="flex w-full items-center"
          >
            <RiCoupon3Line
              color={`${active === 5 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={` sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 5 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Coupon Management
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-amenities-management"
            className="flex w-full items-center"
          >
            <MdFormatListBulletedAdd
              color={`${active === 6 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 6 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Amenities Management
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-destination-management"
            className="flex w-full items-center"
          >
            <MdTravelExplore
              color={`${active === 7 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 7 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Destination Management
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-categories-management"
            className="flex w-full items-center"
          >
            <BiCategoryAlt
              color={`${active === 8 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 8 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Categories Management
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-booking-management"
            className="flex w-full items-center"
          >
            <TbBrandBooking
              color={`${active === 9 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={`sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 9 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Booking Management
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4 ">
          <Link to="/admin-withdraw-money" className="flex w-full items-center">
            <CiMoneyCheck1
              color={`${active === 10 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={` sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 10 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Withdraw Money
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4 ">
          <Link
            to="/admin-banner-management"
            className="flex w-full items-center"
          >
            <CiMoneyCheck1
              color={`${active === 11 ? "crimson" : "#555"}`}
              size={30}
            />
            <h5
              className={` sm:block hidden pl-2 text-[18px] font-Roboto font-[500]  ${
                active === 11 ? "text-[crimson]" : "text-gray-400"
              }`}
            >
              Banner Management
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
