import React from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import CreateProperty from "../../components/Partner/CreateProperty";

const PartnerCreateProperty = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex mt-[4.5rem] items-center justify-between w-full">
        <div className=" w-20 sm:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="flex justify-center w-full">
          <CreateProperty />
        </div>
      </div>
    </div>
  );
};

export default PartnerCreateProperty;
