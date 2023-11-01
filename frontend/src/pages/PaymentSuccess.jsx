import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import SuccessfullPayment from "../components/PaymentDetails/SuccessfullPayment";
import ProfilePage from "../components/ProfilePage/ProfilePage";

const PaymentSuccess = () => {
  const [profileShow, setProfileShow] = useState(false);

  const handleProfilePage = () => {
    setProfileShow(!profileShow);
  };
  return (
    <div>
      <Header profiles={handleProfilePage} profileShow={profileShow} />
      <div className="text-black fixed top-[7rem] right-[0%]  left-[0%]  md:right-[25%] md:left-[25%]     border-0 shadow-md rounded-md   z-[99999] ">
        {profileShow && <ProfilePage setProfileShow={setProfileShow} key={2} />}
      </div>
      <SuccessfullPayment />
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
