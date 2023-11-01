import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import UserMangement from "../../components/Admin/userMangement";

const AdminUsersManagement = () => {
  return (
    <div className="bg-[#222020] ">
      <Header />
      <div className="flex mt-[5rem]  justify-between w-full">
        <div className=" w-20 sm:w-[350px]">
          <SideNavbar active={2} />
        </div>
        <div className=" flex justify-center  bg-[#020206] overflow-x-scroll  min-h-[90vh]  overflow-y-scroll p-2  w-full">
          <UserMangement />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersManagement;
