import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import AmenitiesAddList from "../../components/Admin/AmenitiesAddList";

const AmenitiesManagement = () => {
  return (
    <div className="bg-[#222020] ">
      <Header />
      <div className="flex mt-[5rem]     justify-between w-full">
        <div className=" w-20 sm:w-[350px]">
          <SideNavbar active={6} />
        </div>
        <div className=" flex  justify-start bg-[#09091c] overflow-x-hidden   flex-col h-[90vh] overflow-y-scroll   w-full">
          <AmenitiesAddList />
        </div>
      </div>
    </div>
  );
};

export default AmenitiesManagement;
