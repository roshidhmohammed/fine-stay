import React from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import PartnerWithdrawals from "../../components/Partner/PartnerWithdrawals";

const PartnerWithdrawalPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className=" flex mt-[4.5rem] justify-between  w-full">
        <div className=" w-20 sm:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="relative sm:pl-64 pl-10   flex justify-start  w-full">
          <PartnerWithdrawals />
        </div>
      </div>
    </div>
  );
};

export default PartnerWithdrawalPage;
