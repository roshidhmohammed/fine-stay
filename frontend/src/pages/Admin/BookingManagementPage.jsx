import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import BookingManagement from "../../components/Admin/BookingManagement";

const BookingManagementPage = () => {
  return (
    <div className="bg-[#222020] ">
      <Header />
      <div className="flex mt-[5rem]   justify-between w-full">
        <div className=" w-20  sm:w-[350px]">
          <SideNavbar active={9} />
        </div>
        <div className=" flex justify-start    min-h-[90vh]  overflow-y-scroll bg-[#09091c]   w-full">
          <BookingManagement />
        </div>
      </div>
    </div>
  );
};

export default BookingManagementPage;
