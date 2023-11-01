import React from "react";
import { useLottie } from "lottie-react";
import animationData from "../../Assests/Animations/animation_lmjldjci.json";
import { Link } from "react-router-dom";
const SuccessfullPayment = () => {
  const options = {
    animationData: animationData,
    loop: true,
    style: {
      height: "70vh",
    },
  };
  const { View } = useLottie(options);
  return (
    <div className="bg-[#EBE3E0]">
      {View}
      <h5 className="text-center pb-3 font-Roboto font-medium text-[25px] tracking-wide text-black">
        Your booking is successfull! 😍
      </h5>
      <div className="flex justify-center text-center items-center pt-2 pb-5  ">
        <Link to="/">
          <h1 className="text-[20px] font-bold  text-blue-800 hover:bg-black hover:text-white px-1 ">
            For Booking Details go to your profile
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfullPayment;
