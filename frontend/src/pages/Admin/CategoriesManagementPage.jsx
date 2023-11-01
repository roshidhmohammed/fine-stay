import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import CategoriesManagement from "../../components/Admin/CategoriesManagement";

const CategoriesManagementPage = () => {
  return (
    <div className="bg-[#222020]">
      <Header />
      <div className="flex mt-[5rem] justify-between w-full">
        <div className=" w-20 sm:w-[350px]">
          <SideNavbar active={8} />
        </div>
        <div className=" flex  justify-start flex-col  min-h-[90vh]  overflow-y-scroll bg-[#09091c]    w-full">
          <CategoriesManagement />
        </div>
      </div>
    </div>
  );
};

export default CategoriesManagementPage;
