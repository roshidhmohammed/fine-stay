import React, { useEffect } from "react";
import { FaMoneyCheck, FaRupeeSign } from "react-icons/fa";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions/booking";
import { getPartnerAllProperties } from "../../redux/actions/property";
import PartnerDashboardChart from "../../components/Partner/PartnerDashboardChart";

const PartnerDashboard = () => {
  const { allBookings } = useSelector((state) => state.bookings);
  const { properties } = useSelector((state) => state.property);
  const { partner } = useSelector((state) => state.partner);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getPartnerAllProperties(partner?._id));
  }, [dispatch, partner]);
  const today = new Date();
  const dateFormat = (today) => {
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear());
    return `${year}-${month}-${day}`;
  };
  const todayDate = dateFormat(today);

  const BookingBypartnerProperty =
    properties &&
    properties.map(
      (property) =>
        allBookings &&
        allBookings.filter(
          (booking) =>
            booking.propertyId === property._id &&
            booking.createdAt.substring(0, 10) === todayDate &&
            booking.bookingStatus !== "booked"
        )
    );

  // today earnings

  let total = [];
  BookingBypartnerProperty &&
    BookingBypartnerProperty.map(
      (i) => i && i.forEach((item) => total.push(item.totalPrice))
    );
  const todayTotalEarnings =
    total && total.reduce((acc, num) => acc + parseInt(num), 0);

  // total cash payment
  const BookingByCash =
    properties &&
    properties.map(
      (property) =>
        allBookings &&
        allBookings.filter(
          (booking) =>
            booking.propertyId === property._id &&
            booking.paymentMode === "Cash Payment" &&
            booking.bookingStatus !== "booked"
        )
    );
  let totalCashpayment = [];
  BookingByCash &&
    BookingByCash.map(
      (i) => i && i.forEach((item) => totalCashpayment.push(item.totalPrice))
    );
  const totalCashEarnings =
    totalCashpayment &&
    totalCashpayment.reduce((acc, num) => acc + parseInt(num), 0);

  // total online payment

  const BookingByOnlinePayment =
    properties &&
    properties.map(
      (property) =>
        allBookings &&
        allBookings.filter(
          (booking) =>
            booking.propertyId === property._id &&
            (booking.paymentMode === "stripe" ||
              booking.paymentMode === "paypal")
        )
    );

  let totalOnlinePayment = [];
  BookingByOnlinePayment &&
    BookingByOnlinePayment.map(
      (i) => i && i.forEach((item) => totalOnlinePayment.push(item.totalPrice))
    );
  const totalOnlineEarnings =
    totalOnlinePayment &&
    totalOnlinePayment.reduce((acc, num) => acc + parseInt(num), 0);

  // no of active booking

  const activeBooking =
    properties &&
    properties.map(
      (property) =>
        allBookings &&
        allBookings.filter(
          (booking) =>
            booking.propertyId === property._id &&
            (booking.bookingStatus === "booked" ||
              booking.bookingStatus === "checked-in")
        )
    );
  let activeBookingCount = [];
  activeBooking &&
    activeBooking.map(
      (i) =>
        i && i.forEach((item) => activeBookingCount.push(item.bookingStatus))
    );

  // total no of booking
  const bookingCount =
    properties &&
    properties.map(
      (property) =>
        allBookings &&
        allBookings.filter((booking) => booking.propertyId === property._id)
    );
  return (
    <>
      <div className=" ">
        <div className="  flex md:justify-start justify-center flex-row xl:gap-[3rem] gap-[0.2rem] flex-wrap xl:px-10 px-1  xl:flex-nowrap">
          <div className="border h-[10rem] bg-white rounded-lg    w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center ">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  Today's Earnings
                </p>
                <p className=" mt-2 pl-1 font-Roboto font-medium text-lg text-gray-800 ">
                  ₹ {(todayTotalEarnings * 80) / 100}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <FaRupeeSign
                    className=" p-4 shadow-sm text-gray-200"
                    size={95}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="border h-[10rem] rounded-lg  bg-white   w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  Available Balance
                </p>
                <p className=" mt-2 pl-1 tracking-wide font-Roboto font-medium text-lg text-gray-800 ">
                  ₹ {partner && partner.availableBalance}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <GiReceiveMoney
                    className=" p-4 shadow-sm text-gray-200"
                    size={95}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg h-[10rem] bg-white    w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  Total Cash Payments
                </p>
                <p className=" mt-2 pl-1 font-Roboto font-medium text-lg text-gray-800 ">
                  ₹ {(totalCashEarnings * 80) / 100}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <GiMoneyStack
                    className=" p-4 shadow-sm text-gray-200"
                    size={95}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="   flex md:justify-start justify-center flex-row xl:gap-[3rem] gap-[0.2rem]  xl:mt-[1rem] mt-[0.2rem] xl:px-10 px-1 flex-wrap  xl:flex-nowrap   ">
          <div className="border rounded-lg h-[10rem] bg-white    w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  Total Online Payments
                </p>
                <p className=" mt-2 pl-1 font-Roboto font-medium text-lg text-gray-800 ">
                  ₹ {(totalOnlineEarnings * 80) / 100}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <FaMoneyCheck
                    className=" p-4 shadow-sm text-gray-200"
                    size={95}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg h-[10rem] bg-white    w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  No of Active Bookings
                </p>
                <p className=" mt-2 pl-1 font-Roboto font-medium text-lg text-gray-800 ">
                  {activeBookingCount.length}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <FaUsers className=" p-4 shadow-sm text-gray-200" size={95} />
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg h-[10rem] bg-white    w-[20rem] p-3 shadow-lg">
            <div className=" flex sm:justify-between justify-center">
              <div className=" flex flex-col  ">
                <p className=" font-Roboto font-bold mt-4  sm:text-[23px] text-black ">
                  Total no of booking
                </p>
                <p className=" mt-2 pl-1 font-Roboto font-medium text-lg text-gray-800 ">
                  {bookingCount?.length}
                </p>
              </div>
              <div className=" flex  pt-1 pr-">
                <p className=" border rounded-md shadow-md  bg-gradient-to-r from-[#F05F57] to-[#360940]  mt-3 ">
                  <FaUsers className=" p-4 shadow-sm text-gray-200" size={95} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="  mt-5">
          <PartnerDashboardChart />
        </div>
      </div>
    </>
  );
};

export default PartnerDashboard;
