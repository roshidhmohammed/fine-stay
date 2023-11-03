import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import {
  MdPayment,
  MdOutlineArrowDropDown,
  MdOutlineArrowDropUp,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { format, parse } from "date-fns";
import { useParams } from "react-router-dom";
import { getAllProperties } from "../../redux/actions/property";
import { getAllCoupons } from "../../redux/actions/coupon";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PersonalDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { allCoupons } = useSelector((state) => state.coupon);
  const { allProperties } = useSelector((state) => state.property);
  const { user } = useSelector((state) => state.user);
  const [isFixed, setIsFixed] = useState(true);
  const [couponOption, setCouponOption] = useState(false);
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [applyCoupon, setApplyCoupon] = useState({
    couponName: "",
    discount: "",
    minAmount: "",
    usedBy: [],
    user: user.name,
  });
  const [mobileNo, setMobNo] = useState(user?.mobileNumber);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("0");

  const stripePromise = loadStripe(stripeApiKey);

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(getAllCoupons());
    dispatch(getAllProperties());
    getStripeApiKey();
    const handleScroll = () => {
      const fixedDiv = document.querySelector(".fixed");
      const footer = document.querySelector(".footer");
      if (!fixedDiv || !footer) {
        // Check if either element is missing in the DOM
        return;
      }

      const fixedDivRect = fixedDiv.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      const distanceToFooter = footerRect.top - fixedDivRect.bottom;

      const stopMovingHeight = 30 * 16;

      if (distanceToFooter < 0 || window.scrollY >= stopMovingHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const filterCouponsByUsedBy = allCoupons?.usedBy?.map(
    (coupon) => coupon === user?._id
  );
  console.log(filterCouponsByUsedBy && filterCouponsByUsedBy);

  const userSelectedProperty =
    allProperties && allProperties.find((item) => item.propertyName === name);

  const review = userSelectedProperty && userSelectedProperty.reviews;
  const ratingCalc = review && review.reduce((acc, num) => acc + num.rating, 0);

  const originalStartDate = search.startDate;
  const startDateWithoutTimezone = originalStartDate.replace(/GMT.*$/, "");
  const parsedStartDate = parse(
    startDateWithoutTimezone,
    "EEE MMM d yyyy HH:mm:ss",
    new Date()
  );
  const formattedStartDate = format(parsedStartDate, "dd/MM/yyyy");

  const originalEndDate = search.endDate;
  const endDateWithoutTimezone = originalEndDate.replace(/GMT.*$/, "");
  const parsedEndDate = parse(
    endDateWithoutTimezone,
    "EEE MMM d yyyy HH:mm:ss",
    new Date()
  );
  const formattedEndDate = format(parsedEndDate, "dd/MM/yyyy");

  const removeStartSlash = formattedStartDate.split("/");
  const removeEndSlash = formattedEndDate.split("/");

  // parse the date parts into date object (month is 0-based)
  const start = new Date(
    removeStartSlash[2],
    removeStartSlash[1] - 1,
    removeStartSlash[0]
  );
  const end = new Date(
    removeEndSlash[2],
    removeEndSlash[1] - 1,
    removeEndSlash[0]
  );

  const daysDiff = Math.abs(end - start);

  const days = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)) + 1;
  const roomsCount = search && search.roomsCount;
  const RoomPrice = userSelectedProperty && userSelectedProperty.price;
  const roomTotalPrice =
    userSelectedProperty && userSelectedProperty.price * roomsCount * days;
  const appliedCouponDiscount = (roomTotalPrice * applyCoupon.discount) / 100;
  const gst =
    search &&
    userSelectedProperty &&
    ((search.roomsCount * userSelectedProperty.price * days) / 100) * 12;
  const totalPrice =
    roomTotalPrice >= applyCoupon.minAmount
      ? roomTotalPrice - appliedCouponDiscount + gst
      : roomTotalPrice + gst;

  const handleSubmitMobileNumber = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/user/insert-mobile-number`,
        { mobileNo, user: user._id },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const appearance = {
    theme: "tabs",
    variables: {
      colorPrimary: "#12171c",
      colorBackground: "#680d0d",
    },
  };
  const options = {
    stripeApiKey,
    appearance,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "hotel",
            amount: {
              currency_code: "USD",
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      // console.log(paymentInfo);

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    navigate("/Payment/success");
    axios.post(
      `${server}/booking/create-booking`,
      {
        roomsCount: search.roomsCount,
        totalPrice: totalPrice,
        userId: user._id,
        userName: user.name,
        appliedCouponId: applyCoupon.id,
        appliedCouponName: applyCoupon.couponName
          ? applyCoupon.couponName
          : "no coupon applied",
        checkinDate: search.startDate,
        checkoutdate: search.endDate,
        // mobileNumber: user.mobileNumber,
        paymentId: paymentInfo.payer_id,
        paymentMode: "paypal",
        paymentType: "paypal",
        propertyId: userSelectedProperty._id,
        propertyName: userSelectedProperty.propertyName,
        config,
      },
      { withCredentials: true }
    );
  };

  const handleCashPayment = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    navigate("/Payment/success");
    axios.post(
      `${server}/booking/create-booking`,
      {
        roomsCount: search.roomsCount,
        totalPrice: totalPrice,
        userId: user._id,
        userName: user.name,
        appliedCouponId: applyCoupon.id,
        appliedCouponName: applyCoupon.couponName
          ? applyCoupon.couponName
          : "no coupon applied",
        checkinDate: search.startDate,
        checkoutdate: search.endDate,
        // mobileNumber: user.mobileNumber,
        paymentId: "no",
        paymentMode: "Cash Payment",
        paymentType: "pay at hotel",
        propertyId: userSelectedProperty._id,
        propertyName: userSelectedProperty.propertyName,
        config,
      },
      { withCredentials: true }
    );
  };
  return (
    <div
      className={`full h-[115rem] ${
        select === "1" ? "md:h-[83rem]" : "md:h-[70rem]"
      } `}
    >
      <div className="relative  ">
        <div className=" hidden md:block absolute top-5  rounded-md   border-solid      left-[8%] right-[34%] p-2   ">
          <div className="flex py-5 px-1 border-b-2 bg-[#9ABDA5]">
            <div className=" ">
              <img
                src={userSelectedProperty && userSelectedProperty.images[0].url}
                alt=""
                className="h-72 w-72 rounded-md shadow-md"
              />
            </div>
            <div className="mt-4  font-Roboto pl-3">
              <p className=" font-bold text-2xl text-slate-900 tracking-wide">
                {userSelectedProperty && userSelectedProperty.propertyName}
              </p>
              <p className=" flex text-lg mt-1">
                <AiFillStar className="mt-1 text-yellow-600 mr-1" />
                {review?.length > 0
                  ? (ratingCalc / review.length).toFixed(1)
                  : "no "}{" "}
                ratings
              </p>
              <p className="text-lg flex mt-1  text-gray-900 font-medium">
                <HiLocationMarker className="mt-1 text-blue-700 mr-1" />
                {userSelectedProperty &&
                  userSelectedProperty.currentLocation.placeName}
              </p>
              <div className=" font-Roboto flex pl-2 mt-5 mb-5  ">
                <div className="border-r-2 pr-4  border-gray-500">
                  <p className=" font-normal text-xl ">check-in</p>
                  <p className=" text-blue-800 font-medium font-Roboto">
                    {formattedStartDate}
                  </p>
                </div>
                <div className="pl-4">
                  <p className="font-normal text-xl">Check-out</p>
                  <p className=" text-blue-800 font-medium font-Roboto">
                    {formattedEndDate}
                  </p>
                </div>
              </div>
              <div className=" font-Roboto flex pl-0 mt-3">
                <div className=" border-t bg-slate-200 flex border-b p-3 pl-2 ">
                  <p className="text-md  font-normal pr-3  border-r">
                    Rooms: {search.roomsCount}
                  </p>
                  <p className="text-md  font-normal pl-3 pr-3 border-r">
                    Adults: {search.adultCount}
                  </p>
                  <p className="text-md  font-normal pl-3 pr-3 ">
                    Children: {search.childrenCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" font-Roboto bg-[#3C735C]  mt-10 pb-10 border-2 border-solid rounded-md">
            <p className="text-xl font-bold bg-[#00302D] py-2 text-slate-100 tracking-wide flex justify-center">
              <BsPeopleFill className="mt-1 mr-1" />
              Guest Details
            </p>
            <div className="mt-5 ml-5 font-Roboto">
              <div className="flex justify-evenly  font-Roboto mt-3">
                <div className=" flex-col">
                  <label className=" font-medium text-lg tracking-wide text-slate-100">
                    Full Name
                  </label>
                  <div className="">
                    <input
                      type="text"
                      value={user.name}
                      className="border-2 w-60 h-9  border-solid pl-2"
                      placeholder="Enter first and last name"
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className=" flex-col">
                  <label className="font-medium text-lg tracking-wide text-slate-100">
                    Email
                  </label>
                  <div className="">
                    <input
                      type="email"
                      value={user.email}
                      className="border-2 w-60 h-9  border-solid pl-2"
                      placeholder="name@abc.com"
                      required
                      disabled
                    />
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmitMobileNumber}>
                <div className="flex justify-evenly  font-Roboto mt-3">
                  <div className=" flex-col">
                    <label className=" font-medium tracking-wide text-lg text-slate-100">
                      Update Mobile Number
                    </label>
                    <div className="">
                      <input
                        type="number"
                        value={mobileNo}
                        onChange={(e) => setMobNo(e.target.value)}
                        className="border-2 w-60 h-9 bg-[#7b9f87]  border-solid pl-2"
                        placeholder="eg:1234567890"
                        
                      />
                    </div>
                  </div>

                  <div className="">
                    {mobileNo !== user.mobileNumber ? (
                      <button
                        type="submit"
                        className="w-60 h-10 mt-6 font-Roboto font-bold text-lg tracking-wide  border-solid rounded-md pt-1 pb-1 shadow-md text-gray-100 bg-[#00302D] hover:bg-[#00302d66]"
                      >
                        Update Mobile Number
                      </button>
                    ) : (
                      <button></button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* payment */}

          <div className=" font-Roboto  mt-10 pb-10 border-2 bg-[#9ABDA5] border-solid rounded-md">
            <p className="text-xl font-bold bg-[#00302D]  text-slate-100 py-2 tracking-wide flex justify-center">
              <MdPayment className="mt-1 mr-1 text-xl" />
              Payment details
            </p>
            <div className="mt-5 mx-2 font-Roboto">
              <p className=" font-bold text-xl tracking-wide">
                Select Payment Options
              </p>
              <div className=" flex  border-solid rounded-md w-auto p-2 shadow-md justify-start pl-5 ml-3 bg-[#3C735C]  text-slate-100 mt-3">
                <div className=" font-Roboto font-medium tracking-wide">
                  <input
                    type="radio"
                    checked={select === "1"}
                    name={select === "1"}
                    onClick={() => setSelect("1")}
                    className="mr-1 h-3 w-3  accent-red-700 "
                  />
                  Pay With Debit/credit Card
                </div>
              </div>
              {select === "1" && (
                <div className=" border border-black mt-2 p-2 mx-10 py-10  bg-[#24243e] rounded-md  shadow-md  ">
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      userSelectedProperty={userSelectedProperty}
                      applyCoupon={applyCoupon}
                      userName={user.name}
                      amount={totalPrice}
                    />
                  </Elements>
                </div>
              )}
              <div className=" flex   border-solid rounded-md w-auto p-2 justify-start pl-5  ml-3 bg-[#3C735C]  text-slate-100 mt-3">
                <div className=" font-Roboto flex font-medium tracking-wide">
                  <input
                    type="radio"
                    checked={select === "2"}
                    name={select === "2"}
                    className="mr-1 h-3 w-3 mt-1 accent-red-700 "
                    onClick={() => {
                      setSelect("2");
                    }}
                  />
                  Pay with Paypal
                </div>
              </div>
              {select === "2" && (
                <div className=" flex ml-10 mt-5 font-Roboto  font-medium  text-lg">
                  <button
                    className=" text-slate-100 cursor-pointer bg-[#7E1717] hover:bg-[#661616] shadow-md py-1 tracking-wide px-4 rounded-md "
                    onClick={() => setOpen(!open)}
                  >
                    Pay Now
                  </button>
                </div>
              )}
              <div className=" flex   border-solid rounded-md w-auto p-2 justify-start pl-5  ml-3 bg-[#3C735C] text-slate-100  mt-3">
                <div className=" font-Roboto flex font-medium tracking-wide">
                  <input
                    type="radio"
                    checked={select === "3"}
                    name={select === "3"}
                    className="mr-1 h-3 w-3 mt-1 accent-red-700 "
                    onClick={() => {
                      setSelect("3");
                    }}
                  />
                  Pay Cash at hotel
                </div>
              </div>
              {select === "3" && (
                <div className=" flex ml-10 mt-5 font-Roboto  font-medium  text-lg">
                  <button
                    className=" text-slate-100 cursor-pointer bg-[#000D6B] hover:bg-[#181b37fc] shadow-md py-1 tracking-wide px-4 rounded-md "
                    onClick={() => handleCashPayment()}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {open ? (
          <div className="md:w-[50%] w-full  md:left-[25%] left-0 overflow-y-scroll z-[99999] md:h-[80vh] h-[40vh] border   fixed  bg-white">
            <div
              className=" flex items-center justify-start pl-3 pt-3"
              onClick={() => setOpen(!open)}
            >
              <RiCloseCircleFill size={30} color="black" />
            </div>
            <div className="     md:px-20 md:py-40  ">
              <PayPalScriptProvider
                options={{
                  clientId: `${process.env.REACT_APP_PAYPAL_CLIENTID}`,
                }}
              >
                <PayPalButtons
                  onApprove={onApprove}
                  createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        ) : null}
        <div
          className={`fixed top-[8.4rem] mb-[30rem] hidden md:block bg-[#9ABDA5]   right-[11.4%]   left-[67%]  rounded-lg shadow-lg border-solid font-Roboto ${
            isFixed ? "fixed" : "absolute top-[32.2rem]"
          } `}
        >
          {/* coupon */}
          <div className="flex flex-col  w-auto mt- font-Roboto ">
            <div className=" border-0 border-t border-b  border-solid flex  bg-[#1F2937] text-gray-100  justify-center items-center h-10">
              <p className=" font-bold text-xl   ">Your Price Summary</p>
            </div>
            <div className=" mt-3 font-Roboto flex pl-3 justify-center bg-[#9C254D] items-center  py-2 mb-2 border-solid ">
              <p className="font-medium text-lg flex text-gray-100  ">
                Select Coupons
                {couponOption && (
                  <MdOutlineArrowDropDown
                    className="  text-3xl"
                    onClick={() => setCouponOption(!couponOption)}
                  />
                )}
                {!couponOption && (
                  <MdOutlineArrowDropUp
                    className="text-3xl"
                    onClick={() => setCouponOption(!couponOption)}
                  />
                )}
              </p>
            </div>
            {!couponOption && (
              <div className="flex   flex-col py-2 ">
                {allCoupons &&
                  allCoupons.map((item, index) =>
                    item.usedBy?.includes(user?._id) ? (
                      <p> </p>
                    ) : (
                      <div className=" mb-1">
                        <div
                          className="flex justify-between  bg-gray-300 pl-1 pr-1  font-Roboto font-medium text-md"
                          key={index}
                        >
                          <p className="">
                            <input
                              type="radio"
                              name="couponSelection"
                              onClick={() =>
                                roomTotalPrice >= item.minAmount &&
                                setApplyCoupon({
                                  couponName: item.couponName,
                                  discount: item.discount,
                                  minAmount: item.minAmount,
                                  usedBy: user._id,
                                })
                              }
                              className=" mr-1"
                            />
                            {item.couponName}
                          </p>
                          <p className="text-gray-900">{item.discount}%</p>
                        </div>
                        <div className=" bg-gray-300 flex justify-center text-red-700">
                          min price should be greater than {item.minAmount}
                        </div>
                      </div>
                    )
                  )}
              </div>
            )}
          </div>
          <div className=" flex  flex-col w-auto border-t border-gray-800 ">
            <div className=" flex justify-between  border-b font-medium text-md mb-2 pb-2 mt-4">
              <p className="pl-1">
                Room Price<span className=" flex ">(₹{RoomPrice}/nights)</span>
              </p>
              <p className=" pr-1">₹{roomTotalPrice}</p>
            </div>
            <div className=" flex justify-between  border-b font-medium text-md mb-2 pb-2 mt-4">
              <p className="pl-1">No of rooms </p>
              <p className=" pr-1">{search && search.roomsCount}</p>
            </div>

            <div className=" flex justify-between   border-b font-medium text-md mb-2 pb-2 mt-2">
              <p className=" text-emerald-900 pl-1">Total Discount</p>
              <p className=" text-emerald-950 pr-1">
                - ₹
                {roomTotalPrice >= applyCoupon.minAmount
                  ? appliedCouponDiscount
                  : "You don't have any valid coupon"}
              </p>
            </div>
            <div className=" flex justify-between    font-medium text-md mb-2 ">
              <p className=" text-red-800 pl-1">gst (12%)</p>
              <p className=" text-red-800 pr-1">+ ₹{gst}</p>
            </div>
            <div className="flex justify-between border-b-2 rounded-b-lg   font-medium text-lg  bg-[#2A363B] text-white pb-2 pt-2 mt-4">
              <p className=" pl-1  tracking-wider">Total</p>
              <p className=" pr-1">₹{totalPrice}</p>
            </div>
          </div>
        </div>
        {/* mobile screen */}
        <div className="block md:hidden">
          <div className="   absolute top-5  border-2 rounded-md left-0 right-0   border-solid       p-2   ">
            <div className="flex justify-center flex-col pb-5 pt-2 border-b mb-5 bg-[#9ABDA5]">
              <div className=" flex justify-center  ">
                <img
                  src={userSelectedProperty?.images[0].url}
                  alt=""
                  className="h-32 w-32 rounded-md shadow-md "
                />
              </div>
              <div className=" flex  justify-center pl-1 ">
                <p className=" font-bold text-2xl text-slate-900 tracking-wide">
                  {userSelectedProperty?.propertyName}
                </p>
              </div>
              <div className=" flex  justify-center pl-1">
                <p className=" flex text-lg mt-1">
                  <AiFillStar className="mt-1 text-yellow-600 mr-1" />
                  {userSelectedProperty?.rating} ratings
                </p>
              </div>
              <div className="mt-4  font-Roboto pl-0">
                <p className="sm:text-lg text-sm flex  mt-1  justify-center text-gray-900">
                  <HiLocationMarker className="mt-1 text-blue-700 mr-1" />
                  {
                    userSelectedProperty?.currentLocation.placeName.split(
                      ","
                    )[0]
                  }
                </p>
                <span className=" flex justify-center sm:text-lg text-sm">
                  {
                    userSelectedProperty?.currentLocation.placeName.split(
                      ","
                    )[1]
                  }
                </span>
                <span className=" flex justify-center sm:text-lg text-sm">
                  {
                    userSelectedProperty?.currentLocation.placeName.split(
                      ","
                    )[2]
                  }
                </span>

                <div className=" font-Roboto flex justify-center flex-row pl-2 mt-5 mb-5  ">
                  <div className="border-r-2 pr-4  border-gray-500">
                    <p className=" font-normal text-xl ">check-in</p>
                    <p className=" text-blue-800">{formattedStartDate}</p>
                  </div>
                  <div className="pl-4">
                    <p className="font-normal text-xl">Check-out</p>
                    <p className=" text-blue-800">{formattedEndDate}</p>
                  </div>
                </div>
                <div className=" font-Roboto flex justify-center pl-0 mt-3">
                  <div className=" border-t bg-slate-200 flex border-b p-0 pl-1 ">
                    <p className="text-md  font-normal pr-3  border-r">
                      Rooms: {search.roomsCount}
                    </p>
                    <p className="text-md  font-normal pl-3 pr-3 border-r">
                      Adults: {search.adultCount}
                    </p>
                    <p className="text-md  font-normal pl-3 pr-3 ">
                      Children: {search.childrenCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* price info */}

            <div className=" flex  flex-col border-2 border-solid bg-[#9ABDA5] ml-10 mr-10 ">
              <p className=" font-bold text-xl bg-[#1F2937] text-gray-100 h-10 items-center  flex justify-center">
                Your Price Summary
              </p>
              <div className=" mt-3 font-Roboto flex pl-3 justify-center bg-[#9C254D] items-center  py-2 border-solid ">
                <p className="font-medium text-lg flex  text-gray-100 ">
                  Select Coupons
                  {couponOption && (
                    <MdOutlineArrowDropDown
                      className="  text-3xl"
                      onClick={() => setCouponOption(!couponOption)}
                    />
                  )}
                  {!couponOption && (
                    <MdOutlineArrowDropUp
                      className="text-3xl"
                      onClick={() => setCouponOption(!couponOption)}
                    />
                  )}
                </p>
              </div>
              {!couponOption && (
                <div className="flex   flex-col py-2 ">
                  {allCoupons &&
                    allCoupons.map((item, index) =>
                      item.usedBy?.includes(user?._id) ? (
                        <p> </p>
                      ) : (
                        <div
                          className="flex justify-between  bg-gray-300 pl-1 pr-1  font-Roboto font-medium text-md"
                          key={index}
                        >
                          <p className="">
                            <input
                              type="radio"
                              name="couponSelection"
                              onClick={() =>
                                roomTotalPrice >= item.minAmount &&
                                setApplyCoupon({
                                  couponName: item.couponName,
                                  discount: item.discount,
                                  minAmount: item.minAmount,
                                  usedBy: user._id,
                                })
                              }
                              className=" mr-1"
                            />
                            {item.couponName}
                          </p>
                          <p className="text-gray-900">{item.discount}%</p>
                        </div>
                      )
                    )}
                </div>
              )}
              <div className=" flex justify-between  border-b font-medium text-md mb-2 pb-2 mt-4">
                <p className="pl-1">
                  Room Price
                  <span className=" flex ">(₹{RoomPrice}/nights)</span>
                </p>
                <p className=" pr-1">₹{roomTotalPrice}</p>
              </div>
              <div className=" flex justify-between  border-b font-medium text-md mb-2 pb-2 mt-4">
                <p className="pl-1">No of rooms </p>
                <p className=" pr-1">{search && search.roomsCount}</p>
              </div>

              <div className=" flex justify-between   border-b font-medium text-md mb-2 pb-2 mt-2">
                <p className=" text-green-700 pl-1">Total Discount</p>
                <p className=" text-green-700 pr-1">
                  - ₹
                  {roomTotalPrice >= applyCoupon.minAmount
                    ? appliedCouponDiscount
                    : "You don't have any valid coupon"}
                </p>
              </div>
              <div className=" flex justify-between    font-medium text-md mb-2 ">
                <p className=" text-red-700 pl-1">gst (12%)</p>
                <p className=" text-red-700 pr-1">+ ₹{gst}</p>
              </div>
              <div className="flex justify-between border-b-2   font-medium text-lg  bg-[#2A363B] text-white pb-2 pt-2 mt-4">
                <p className=" pl-1 ">Total</p>
                <p className=" pr-1">₹{totalPrice}</p>
              </div>
            </div>
            {/* coupon */}

            <div className=" font-Roboto  mt-10 pb-10  border-2 bg-[#3C735C] border-solid rounded-md  ">
              <p className="text-xl font-bold bg-[#00302D] pt-1 pb-1 text-slate-100 tracking-wide flex justify-center">
                <BsPeopleFill className="mt-1 mr-1" />
                Guest Details
              </p>
              <div className="mt-5 mx-2 flex  justify-center flex-col font-Roboto">
                <div className="flex justify-center  flex-col  font-Roboto mt-3">
                  <div className=" flex-col ">
                    <label className=" font-medium text-lg tracking-wide text-slate-100">
                      Full Name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={user.name}
                        className="border-2 w-full h-9   border-solid pl-1"
                        placeholder="Enter first and last name"
                        disabled
                      />
                    </div>
                  </div>
                  <div className=" flex-col ">
                    <label className="font-medium text-lg tracking-wide text-slate-100">
                      Email
                    </label>
                    <div className="">
                      <input
                        type="email"
                        value={user.email}
                        className="border-2 w-full h-9  border-solid pl-1"
                        placeholder="name@abc.com"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="flex  flex-col  font-Roboto mt-3">
                  <div className=" flex-col">
                    <label className=" font-medium tracking-wide text-lg text-slate-100">
                      Update Mobile Number
                    </label>
                    <div className="">
                      <input
                        type="number"
                        value={mobileNo}
                        onChange={(e) => setMobNo(e.target.value)}
                        className="border-2 w-full h-9 bg-[#7b9f87]  border-solid pl-1"
                        placeholder="eg:1234567890"
                        
                      />
                    </div>
                  </div>

                  <div className=" mr-2 ml-2">
                    {mobileNo !== user?.mobileNumber ? (
                      <button className="w-full  h-10 mt-6 font-Roboto font-bold text-lg tracking-wide  border-solid rounded-md pt-1 pb-1 shadow-md text-gray-100 bg-[#00302D] hover:bg-[#00302d66]">
                        Update Mobile Number
                      </button>
                    ) : (
                      <button></button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* payment */}

            <div className=" font-Roboto  mt-10 pb-10  border-2 bg-[#9ABDA5] border-solid rounded-md">
              <p className="text-xl font-bold bg-[#00302D]  py-2 text-slate-100 tracking-wide flex justify-center">
                <MdPayment className="mt-1 mr-1 text-xl" />
                Payment details
              </p>
              <div className="mt-5 mx-2 font-Roboto">
                <p className=" font-bold text-xl tracking-wide">
                  Select Payment Options
                </p>
                <div className=" flex  border-solid rounded-md w-auto p-2 shadow-md justify-start pl-5 ml-3 bg-[#3C735C] text-slate-100 mt-3">
                  <div className=" font-Roboto font-medium tracking-wide">
                    <input
                      type="radio"
                      checked={select === "1"}
                      name={select === "1"}
                      onClick={() => setSelect("1")}
                      className="mr-1 h-3 w-3  accent-red-700 "
                    />
                    Pay With Debit/credit Card
                  </div>
                </div>
                {select === "1" && (
                  <div className=" border border-black mt-2 p-2  sm:mx-10 py-10  bg-[#24243e] rounded-md  shadow-md  ">
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm
                        userSelectedProperty={userSelectedProperty}
                        applyCoupon={applyCoupon}
                        userName={user.name}
                        amount={totalPrice}
                      />
                    </Elements>
                  </div>
                )}

                <div className=" flex   border-solid rounded-md w-auto p-2 justify-start pl-5  ml-3 bg-[#3C735C] text-slate-100  mt-3">
                  <div className=" font-Roboto flex font-medium tracking-wide">
                    <input
                      type="radio"
                      checked={select === "2"}
                      name={select === "2"}
                      onClick={() => {
                        setSelect("2");
                      }}
                      className="mr-1 h-3 w-3 mt-1 accent-red-700 "
                    />
                    Pay with Paypal
                  </div>
                </div>
                {select === "2" && (
                  <div className=" flex ml-10 mt-5 font-Roboto  font-medium  text-lg">
                    <button
                      className=" text-slate-100 cursor-pointer bg-[#7E1717] hover:bg-[#661616] shadow-md py-1 tracking-wide px-4 rounded-md "
                      onClick={() => setOpen(!open)}
                    >
                      Pay Now
                    </button>
                  </div>
                )}

                <div className=" flex  border-solid rounded-md w-auto p-2 justify-start pl-5  ml-3 bg-[#3C735C] text-slate-100  mt-3">
                  <div className=" font-Roboto flex font-medium tracking-wide">
                    <input
                      type="radio"
                      checked={select === "3"}
                      name={select === "3"}
                      onClick={() => {
                        setSelect("3");
                      }}
                      className="mr-1 h-3 w-3 mt-1 accent-red-700 "
                    />
                    Pay Cash at hotel
                  </div>
                </div>
                {select === "3" && (
                  <div className=" flex ml-10 mt-5 font-Roboto  font-medium  text-lg">
                    <button
                      className=" text-slate-100 cursor-pointer bg-[#000D6B] hover:bg-[#181b37fc] shadow-md py-1 tracking-wide px-4 rounded-md "
                      onClick={() => handleCashPayment()}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({
  userSelectedProperty,
  applyCoupon,
  userName,
  amount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { search } = useSelector((state) => state.search);

  const [clientSecret, setClientSecret] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getClientSecret(total) {
      try {
        const { data } = await axios.post(
          `${server}/payment/create-payment-intent`,
          { total },
          { withCredentials: true }
        );
        setClientSecret(data.client_secret);
      } catch (error) {
        setErrorMsg(error.message);
      }
    }

    getClientSecret(amount);
  }, [amount]);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });
    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        navigate("/Payment/success");
        console.log(result.paymentIntent.id);

        await axios.post(
          `${server}/booking/create-booking`,
          {
            roomsCount: search.roomsCount,
            totalPrice: amount,
            userId: user._id,
            userName: user.name,
            appliedCouponId: applyCoupon.id,
            appliedCouponName: applyCoupon.couponName
              ? applyCoupon.couponName
              : "no coupon applied",
            checkinDate: search.startDate,
            checkoutdate: search.endDate,
            // mobileNumber: user.mobileNumber,
            paymentId: result.paymentIntent.id,
            paymentMode: "stripe",
            paymentType: result.paymentIntent.payment_method_types[0],
            propertyId: userSelectedProperty._id,
            propertyName: userSelectedProperty.propertyName,
          },
          { withCredentials: true }
        );
      }
    }
  };

  return (
    <div className="">
      <form className="" onSubmit={paymentHandler}>
        <div className=" flex justify-center sm:flex-nowrap flex-wrap  sm:gap-10 gap-1  items-center">
          <div className="flex  flex-col">
            <label className=" font-Roboto text-white text-lg font-medium tracking-wide ">
              Name On Card
            </label>
            <input
              required
              value={userName}
              placeholder={userName}
              className="w-52 border bg-[#414345] text-white border-black mt-2 p-1 rounded-md shadow-md"
            />
          </div>
          <div className="flex  flex-col">
            <label className="  font-Roboto text-white  text-lg font-medium tracking-wide  ">
              Exp Date
            </label>
            <CardExpiryElement
              className="sm:w-40  w-52 border bg-[#414345] text-white border-black mt-2 p-1 rounded-md shadow-md"
              options={{
                style: {
                  base: {
                    fontSize: "19px",
                    lineHeight: 1.5,
                    color: "white",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className=" flex justify-center sm:flex-nowrap flex-wrap sm:gap-10 gap-1 items-center">
          <div className="flex  flex-col">
            <label className=" font-Roboto text-white  text-lg font-medium tracking-wide ">
              Card Number
            </label>

            <CardNumberElement
              className="w-52 border bg-[#414345] text-white border-black mt-2 p-1 rounded-md shadow-md"
              options={{
                style: {
                  base: {
                    fontSize: "19px",
                    lineHeight: 1.5,
                    color: "white",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="flex  flex-col ">
            <label className="  font-Roboto text-white  text-lg font-medium tracking-wide  ">
              CVV
            </label>
            <CardCvcElement
              className="sm:w-40 w-52 border bg-[#414345] text-white border-black mt-2 p-1 rounded-md shadow-md"
              options={{
                style: {
                  base: {
                    fontSize: "19px",
                    lineHeight: 1.5,
                    color: "white",
                  },
                  empty: {
                    color: "#3a120a",
                    backgroundColor: "transparent",
                    "::placeholder": {
                      color: "",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {errorMsg && <div className="errorMsg">{errorMsg}</div>}
        <div className="flex  justify-center">
          <button
            type="submit"
            className="  border w-[35%] mt-4 p-2 rounded-md bg-black text-white text-lg hover:bg-gray-900 shadow-md tracking-wider"
            disabled={!stripe}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};
export default PersonalDetails;
