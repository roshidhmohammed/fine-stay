import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import ListedPropertiesManagement from "../../components/Admin/ListedPropertiesManagement";

const AdminListedProperties = () => {
  return (
    <div className="bg-[#222020] ">
      <Header />
      <div className="flex  mt-[5rem]   justify-between w-full">
        <div className=" w-20  sm:w-[350px]">
          <SideNavbar active={4} />
        </div>
        <div className=" flex justify-center h-[90vh] overflow-y-scroll  w-full">
          <ListedPropertiesManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminListedProperties;
