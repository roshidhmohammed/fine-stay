import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import BannerManagement from "../../components/Admin/BannerManagement";

const BannerManagementPage = () => {
  return (
    <div className="bg-[#222020]">
      <Header />
      <div className="flex mt-[5rem] overflow-y-hidden  justify-between w-full">
        <div className=" w-20  sm:w-[350px]">
          <SideNavbar active={11} />
        </div>
        <div className=" flex flex-col  overflow-x-hidden bg-[#09091c] justify-start min-h-[90vh]  overflow-y-scroll    w-full">
          <BannerManagement />
        </div>
      </div>
    </div>
  );
};

export default BannerManagementPage;
