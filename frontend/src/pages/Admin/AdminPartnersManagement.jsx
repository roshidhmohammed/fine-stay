import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import PartnersManagement from "../../components/Admin/PartnersManagement";

const AdminPartnersManagement = () => {
  return (
    <div className="bg-[#19191a]  ">
      <Header />
      <div className="flex mt-[5rem]     justify-between w-full">
        <div className=" w-20    sm:w-[350px]">
          <SideNavbar active={3} />
        </div>
        <div className="  flex justify-center p-2 bg-[#020206] h-[90vh] overflow-y-scroll    w-full">
          <PartnersManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminPartnersManagement;
