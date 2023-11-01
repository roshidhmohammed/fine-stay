import React from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import PartnerConversation from "../../components/Partner/PartnerConversation";

const PartnerCoversationPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className=" flex mt-[4.5rem] justify-between  w-full">
        <div className=" w-20 sm:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="relative  flex justify-start  w-full">
          <PartnerConversation />
        </div>
      </div>
    </div>
  );
};

export default PartnerCoversationPage;
