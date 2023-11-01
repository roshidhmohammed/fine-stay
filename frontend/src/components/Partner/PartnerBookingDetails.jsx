import React, { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions/booking";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const PartnerBookingDetails = ({ setBookingDetails, propertyId }) => {
  const [bookingsShow, setBookingsShow] = useState(false);
  const { allBookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const [bookingStatuses, setBookingStatuses] = useState({});

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleChange = (e, bookingId) => {
    const { value } = e.target;
    setBookingStatuses((prevStatuses) => ({
      ...prevStatuses,
      [bookingId]: value,
    }));
  };

  const handleSubmitBookingStatus = async () => {
    if (Object.keys(bookingStatuses).length > 1) {
      toast.error("please update one guests information");
    } else {
      axios
        .post(`${server}/booking/update-booking-status`, bookingStatuses, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, "3000");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const filteredBookingsByProperty =
    allBookings &&
    allBookings.filter(
      (property, index) =>
        (property.propertyId === propertyId &&
          property.bookingStatus === "booked") ||
        (property.propertyId === propertyId &&
          property.bookingStatus === "checked-in")
    );

  const completedBookingsByProperty =
    allBookings &&
    allBookings.filter(
      (property, index) =>
        property.propertyId === propertyId &&
        property.bookingStatus === "checked-out"
    );
  return (
    <>
      <div className=" flex justify-start   mt-3 md:ml-3 sm:ml-10 ">
        <FiArrowLeftCircle
          size={28}
          onClick={() => setBookingDetails("propertyList")}
        />
      </div>
      <div className=" flex  justify-start sm::justify-center items-start  lg:mx-[17rem] md:mx-[14rem]  sm:mx-[0rem]   text-lg md:px-5 font-Roboto  font-medium  md:gap-3 mt-10">
        <div
          className={`${
            bookingsShow ? "text-gray-800  bg-red-700" : "text-white bg-black"
          } border border-solid  md:text-lg text-sm     md:px-2 rounded-md  shadow-md py-1`}
          onClick={() => setBookingsShow(!bookingsShow)}
        >
          Ongoing Accomodations
        </div>
        <div
          className={` ${
            bookingsShow ? "text-white  bg-black" : "text-gray-800  bg-red-700 "
          }  border md:px-2  rounded-md  md:text-lg text-sm shadow-md py-1`}
          onClick={() => setBookingsShow(!bookingsShow)}
        >
          Completed Accomodations
        </div>
      </div>

      {bookingsShow && (
        <div class="    flex  px-2    w-full   mt-10     overflow-x-auto">
          <table class="  w-full   text-sm text-left text-gray-900 dark:text-gray-900">
            <thead class="text-xs  text-gray-900  uppercase   bg-gray-400 dark:bg-gray-400 dark:text-gray-900">
              <tr>
                <th scope="col" class="px-6 py-4 border-r  border-gray-500">
                  Booking Id
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Guest Name
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Check-in
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Check-out
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Rooms
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500 ">
                  Status
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Payment Type
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Amount
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBookingsByProperty.length > 0 &&
                filteredBookingsByProperty.map((booking, index) => (
                  <tr
                    key={booking._id}
                    class="bg-white border-b  dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 border-r border-l text-[15px] border-gray-300 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
                    >
                      {booking._id}
                    </th>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.userName}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.checkinDate}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.checkOutDate}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.roomsCount}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.bookingStatus === "booked" ? (
                        <select
                          key={booking._id}
                          name={`status-${booking._id}`}
                          className={`${
                            bookingStatuses[booking._id] === "checked-in"
                              ? "bg-green-900 text-white"
                              : bookingStatuses[booking._id] === "checked-out"
                              ? "bg-red-900 text-white"
                              : "bg-orange-700 text-white"
                          }    text-lg px-4 focus:outline-none focus:border-gray-900  py-1 font-Roboto rounded-[10px] border cursor-pointer  `}
                          value={bookingStatuses[booking._id] || ""}
                          onChange={(e) => handleChange(e, booking._id)}
                        >
                          <option
                            className="bg-gray-900 text-white"
                            value="booked"
                            key={booking._id}
                          >
                            {booking.bookingStatus}
                          </option>
                          <option
                            className="bg-gray-900 text-white"
                            value="checked-in"
                          >
                            {" "}
                            checked-in
                          </option>
                          <option
                            className="bg-gray-900 text-white"
                            value="checked-out"
                          >
                            {" "}
                            checked-out
                          </option>
                        </select>
                      ) : (
                        <select
                          name={`status-${booking._id}`}
                          className={`${
                            bookingStatuses[booking._id] === "checked-out"
                              ? "bg-red-800 text-white"
                              : "bg-green-900 text-white"
                          }    text-lg px-4 focus:outline-none focus:border-gray-900  py-1 font-Roboto rounded-[10px] border cursor-pointer `}
                          value={bookingStatuses[booking._id] || ""}
                          onChange={(e) => handleChange(e, booking._id)}
                        >
                          <option
                            className="bg-gray-900 text-white"
                            value="checked-in"
                          >
                            {" "}
                            checked-in
                          </option>
                          <option
                            className="bg-gray-900 text-white"
                            value="checked-out"
                          >
                            {" "}
                            checked-out
                          </option>
                        </select>
                      )}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.paymentType}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      ₹ {booking.totalPrice}
                    </td>
                    <td class="px-6 py-4 border-r border-gray-300">
                      <button
                        className=" font-Roboto font-bold text-gray-100 bg-indigo-800 hover:bg-indigo-950 tracking-wide border px-2 py-2  rounded-[11px]"
                        onClick={() => handleSubmitBookingStatus()}
                        disabled={
                          (booking.bookingStatus === "booked" &&
                            bookingStatuses[booking._id] === "booked") ||
                          (booking.bookingStatus === "checked-in" &&
                            bookingStatuses[booking._id] === "checked-in")
                        }
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

            {filteredBookingsByProperty.length < 1 && (
              <tr className="  text-[20px] text-black h-10 mx-40">
                No Bookings
              </tr>
            )}
          </table>
        </div>
      )}

      {!bookingsShow && (
        <div class="    flex  px-2    w-full   mt-10     overflow-x-auto">
          <table class="  w-full   text-sm text-left text-gray-900 dark:text-gray-900">
            <thead class="text-xs  text-gray-900  uppercase   bg-gray-400 dark:bg-gray-400 dark:text-gray-900">
              <tr>
                <th scope="col" class="px-6 py-4 border-r  border-gray-500">
                  Booking Id
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Guest Name
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Check-in
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Check-out
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Rooms
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500 ">
                  Status
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Payment Type
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Payment Id
                </th>
                <th scope="col" class="px-6 py-4 border-r border-gray-500">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {completedBookingsByProperty.length > 0 &&
                completedBookingsByProperty.map((booking, index) => (
                  <tr
                    key={booking._id}
                    class="bg-white border-b  dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 border-r border-l text-[15px] border-gray-300 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
                    >
                      {booking._id}
                    </th>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.userName}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.checkinDate}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.checkOutDate}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.roomsCount}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[17px] text-gray-900 border-gray-300">
                      <p className="flex w-[8rem]  justify-center py-2 rounded-[10px] border  bg-red-900 text-white">
                        {booking.bookingStatus}
                      </p>
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.paymentType}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      {booking.paymentId}
                    </td>
                    <td class="px-6 py-4 border-r font-medium text-[15px] text-gray-900 border-gray-300">
                      ₹ {booking.totalPrice}
                    </td>
                  </tr>
                ))}
            </tbody>
            {completedBookingsByProperty.length < 1 && (
              <tr className="  text-[20px] text-black h-10 mx-40">
                No Bookings
              </tr>
            )}
          </table>
        </div>
      )}
    </>
  );
};

export default PartnerBookingDetails;
