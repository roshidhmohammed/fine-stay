import React, { useState } from "react";
import DashboardHeader from "../../components/Partner/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Partner/Layout/DashboardSideBar";
import PartnerAllBookings from "../../components/Partner/PartnerAllBookings";
import PartnerBookingDetails from "../../components/Partner/PartnerBookingDetails";

const PartnerAllBookingsPage = () => {
  const [bookingDetails, setBookingDetails] = useState("propertyList");
  const [propertyId, setpropertyId] = useState();

  return (
    <div>
      <div className="flex  right-0 left-0 w-full">
        <DashboardHeader />
      </div>
      {bookingDetails === "propertyList" && (
        <div className="flex mt-[4.5rem]   justify-between w-full">
          <div className=" w-20 sm:w-[330px]  ">
            <DashboardSideBar active={2} />
          </div>
          <div className="flex justify-start overflow-x-scroll   items-start w-full">
            <PartnerAllBookings
              setBookingDetails={setBookingDetails}
              setpropertyId={setpropertyId}
            />
          </div>
        </div>
      )}
      {bookingDetails === "accomodationDetails" && (
        <div className="flex mt-20 justify-between w-full">
          <div className=" w-20 sm:w-[330px]">
            <DashboardSideBar active={2} />
          </div>
          <div className="flex  sm:pl-64 pl-20    flex-col items-start w-full">
            <PartnerBookingDetails
              setBookingDetails={setBookingDetails}
              propertyId={propertyId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerAllBookingsPage;
