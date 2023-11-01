import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import About from "../components/Layout/About"

const AboutPage = () => {
  const [profileShow, setProfileShow] = useState(false);
  const handleProfilePage = () => {
    setProfileShow(!profileShow);
  };
  return (
    <div className=" bg-[#EBE3E0]">
      <Header profiles={handleProfilePage} profileShow={profileShow} />
      <About/>
      <Footer />
    </div>
  );
};

export default AboutPage;
