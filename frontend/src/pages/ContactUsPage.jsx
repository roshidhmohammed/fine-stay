import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ContactUs from "../components/Layout/ContactUs";

const ContactUsPage = () => {
  const [profileShow, setProfileShow] = useState(false);
  const handleProfilePage = () => {
    setProfileShow(!profileShow);
  };
  return (
    <div>
      <Header profiles={handleProfilePage} profileShow={profileShow} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
