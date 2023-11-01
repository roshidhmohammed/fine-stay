import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Banner from "../components/Layout/Banner";
import TopDestinations from "../components/Layout/TopDestinations";
import TopRatedProperties from "../components/Layout/TopRatedProperties";
import BrowseByCategories from "../components/Layout/BrowseByCategories";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  const [profileShow, setProfileShow] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("latitude is ", position.coords.latitude);
      console.log("longitude is ", position.coords.longitude);
    });
  }, []);
  const handleProfilePage = () => {
    setProfileShow(!profileShow);
  };

  return (
    <div className="bg-white">
      <Header profiles={handleProfilePage} profileShow={profileShow} />
      <Banner
        profiles={handleProfilePage}
        profileShow={profileShow}
        setProfileShow={setProfileShow}
      />
      <TopDestinations />
      <TopRatedProperties />
      <BrowseByCategories />
      <Footer />
    </div>
  );
};

export default HomePage;
