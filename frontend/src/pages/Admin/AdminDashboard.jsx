import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import AdminDashboardComponent from "../../components/Admin/AdminDashboardComponent";

const AdminDashboard = () => {
  return (
    <div className="bg-[#000000] ">
      <Header />
      <div className="flex mt-[5rem]  justify-between w-full">
        <div className=" w-20 sm:w-[350px]">
          <SideNavbar active={1} />
        </div>
        <div className=" flex justify-center h-[90vh] overflow-y-scroll overflow-x-hidden bg-[#000000]  w-full">
          <AdminDashboardComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
