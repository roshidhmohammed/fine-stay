import React from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import PartnerDashboard from "../../components/Partner/PartnerDashboard";

const PartnerDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex mt-[4.5rem] items-start   justify-between w-full">
        <div className=" w-20     sm:w-[350px]">
          <DashboardSideBar active={1} />
        </div>
        <div className="flex justify-center flex-wrap h-[90vh] overflow-y-scroll  overflow-x-hidden  pt-5   w-full">
          <PartnerDashboard />
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardPage;
