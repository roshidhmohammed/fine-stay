import React, { useState } from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import ListedProperties from "../../components/Partner/ListedProperties";
import PartnerPropertyView from "../../components/Partner/PartnerPropertyView";

const PartnerListedProperties = () => {
  const [propertyShow, setPropertyShow] = useState(false);
  const [propId, setPropId] = useState();
  return (
    <div>
      <DashboardHeader />
      <div className=" flex mt-[4.5rem] justify-between  w-full">
        <div className=" w-20 sm:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        {!propertyShow && (
          <div className=" flex xl:pl-20 sm:pl-64 pl-20 justify-center  w-full">
            <ListedProperties
              setPropertyShow={setPropertyShow}
              setPropId={setPropId}
            />
          </div>
        )}
        {propertyShow && (
          <div className=" flex  overflow-y-scroll justify-start my-3  w-full">
            <PartnerPropertyView
              setPropertyShow={setPropertyShow}
              propId={propId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerListedProperties;
