import React, { useEffect } from "react";
import { FaMoneyCheck, FaRupeeSign, FaUsers } from "react-icons/fa";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions/booking";
import { getAllPartners } from "../../redux/actions/partner";
import { getAllProperties } from "../../redux/actions/property";
import AdminDashboardChart from "../../components/Admin/AdminDashboardChart";

const AdminDashboardComponent = () => {
  const { allBookings } = useSelector((state) => state.bookings);
  const { allPartners } = useSelector((state) => state.partner);
  const { allProperties } = useSelector((state) => state.property);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllPartners());
    dispatch(getAllProperties());
  }, [dispatch]);

  // today date
  const today = new Date();
  const dateFormat = (today) => {
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear());
    return `${year}-${month}-${day}`;
  };
  const todayDate = dateFormat(today);

  // today earnings

  const todayBookingEarnings = allBookings?.filter(
    (item) =>
      (item.checkinDate.slice(0, 10) === todayDate ||
        item.checkOutDate.slice(0, 10) === todayDate) &&
      (item.bookingStatus === "checked-in" ||
        item.bookingStatus === "checked-out")
  );
  let total = [];
  todayBookingEarnings?.map((booking) => total.push(booking.totalPrice));
  const todayEarnings = total?.reduce((acc, num) => acc + num, 0);

  // this month Earnings

  const totalBookingEarnings = allBookings?.filter(
    (item) =>
      item.bookingStatus === "checked-in" ||
      item.bookingStatus === "checked-out"
  );
  let totalEarnings = [];
  totalBookingEarnings?.map((booking) =>
    totalEarnings.push(booking.totalPrice)
  );
  const availableBalance = totalEarnings?.reduce((acc, num) => acc + num, 0);

  //  total cash payments
  const totalCashBooking = allBookings?.filter(
    (item) =>
      (item.bookingStatus === "checked-in" ||
        item.bookingStatus === "checked-out") &&
      item.paymentMode === "Cash Payment"
  );
  let totalCash = [];
  totalCashBooking?.map((booking) => totalCash.push(booking.totalPrice));
  const cashPayment = totalCash?.reduce((acc, num) => acc + num, 0);

  // total online payment
  const totalOnlineBooking = allBookings?.filter(
    (item) =>
      (item.bookingStatus === "checked-in" ||
        item.bookingStatus === "checked-out") &&
      (item.paymentMode === "stripe" || item.paymentMode === "paypal")
  );
  let totalOnline = [];
  totalOnlineBooking?.map((booking) => totalOnline.push(booking.totalPrice));
  const OnlinePayment = totalOnline?.reduce((acc, num) => acc + num, 0);

  // total  partners

  return (
    <div>
      <div className=" flex justify-center flex-row  xl:gap-[3rem] gap-[1rem] xl:px-10 px-1 flex-wrap mt-5  lg:flex-nowrap">
        <div className="border border-[#10074d]   h-[10rem] bg-[#090230] rounded-lg w-[16rem]   xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto font-bold mt-4 tracking-wide  xl:text-[23px] text-gray-400 ">
                Today's Earnings
              </p>
              <p className=" mt-3 pl-1 font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                ₹ {(todayEarnings * 20) / 100}
              </p>
            </div>
            <div className=" flex   pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#de1069]  mt-3 ">
                <FaRupeeSign
                  className=" p-4 shadow-sm text-gray-200"
                  size={95}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#10074d] h-[10rem] rounded-lg  bg-[#090230] w-[16rem]  xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto tracking-wide font-bold mt-2  xl:text-[23px] text-gray-400">
                Available Balance
              </p>
              <p className=" font-Roboto text-gray-400 flex justify-center">
                (20% of each booking)
              </p>

              <p className=" mt- pl-1 tracking-wide font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                ₹ {(availableBalance * 20) / 100}
              </p>
            </div>
            <div className=" flex  pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#039663]  mt-3 ">
                <GiReceiveMoney
                  className=" p-4 shadow-sm text-gray-200"
                  size={95}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#10074d] rounded-lg h-[10rem] bg-[#090230]  w-[16rem]  xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto font-bold mt-2  xl:text-[23px] text-gray-400 ">
                Total Cash Payments
              </p>
              <p className=" font-Roboto text-gray-400 flex justify-center">
                ({totalCash?.length} bookings)
              </p>
              <p className="  pl-1 font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                ₹ {(cashPayment * 20) / 100}
              </p>
            </div>
            <div className=" flex  pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#1505a8]  mt-3 ">
                <GiMoneyStack
                  className=" p-4 shadow-sm text-gray-200"
                  size={95}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="   flex flex-row justify-center xl:gap-[3rem] gap-[1rem] xl:px-10 px-1 mt-[1.5rem]  flex-wrap lg:flex-nowrap    ">
        <div className="border border-[#10074d] rounded-lg h-[10rem] bg-[#090230]  w-[16rem]  xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto font-bold mt-2  xl:text-[20px] text-gray-400">
                Total Online Payments
              </p>
              <p className=" font-Roboto text-gray-400 flex justify-center">
                ({totalOnline?.length} bookings)
              </p>
              <p className="  pl-1 font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                ₹ {(OnlinePayment * 20) / 100}
              </p>
            </div>
            <div className=" flex  pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#b30e87]  mt-3 ">
                <FaMoneyCheck
                  className=" p-4 shadow-sm text-gray-200"
                  size={95}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#10074d] rounded-lg h-[10rem] bg-[#090230] w-[16rem]  xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto  font-bold mt-4 tracking-wide  xl:text-[23px] text-gray-400 ">
                Total Partners
              </p>
              <p className=" mt-2 pl-1 font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                {allPartners?.length}
              </p>
            </div>
            <div className=" flex  pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#b80629]  mt-3 ">
                <FaUsers className=" p-4 shadow-sm text-gray-200" size={95} />
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#10074d] rounded-lg h-[10rem] bg-[#090230] w-[16rem]   xl:w-[21rem] p-3 shadow-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col  ">
              <p className=" font-Roboto font-bold mt-4 tracking-wide   xl:text-[23px] text-gray-400 ">
                Total Properties
              </p>
              <p className=" mt-2 pl-1 font-Roboto font-medium text-[20px] xl:text-[30px] flex  justify-center text-gray-500 ">
                {allProperties?.length}
              </p>
            </div>
            <div className=" flex  pt-1 pr-">
              <p className="  rounded-md shadow-md  bg-[#9e7609]  mt-3 ">
                <FaUsers className=" p-4 shadow-sm text-gray-200" size={95} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-white    mt-5">
        <AdminDashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
