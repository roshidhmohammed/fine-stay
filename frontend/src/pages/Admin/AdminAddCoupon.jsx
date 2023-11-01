import React from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import CouponManagement from "../../components/Admin/CouponManagement";

const AdminAddCoupon = () => {
  return (
    <div className="bg-[#222020]">
      <Header />
      <div className="flex mt-[5rem] justify-between w-full">
        <div className=" w-20 sm:w-[350px]">
          <SideNavbar active={5} />
        </div>
        <div className=" flex  flex-col  overflow-x-hidden justify-start bg-[#09091c]  min-h-[90vh]  overflow-y-scroll  w-full">
          <CouponManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminAddCoupon;
