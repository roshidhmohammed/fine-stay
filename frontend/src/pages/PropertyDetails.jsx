import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import PropertyImage from "../components/PropertyDetails/PropertyImage";
import PropertyDescription from "../components/PropertyDetails/PropertyDescription";
import Reviews from "../components/PropertyDetails/Reviews";
import Footer from "../components/Layout/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../redux/actions/property";
import ProfilePage from "../components/ProfilePage/ProfilePage";

const PropertyDetails = () => {
  const {name} = useParams();
  const [data,setData] = useState(null);
  const propertyNames = name.replace(/-/g, " ");
  const {allProperties} = useSelector((state) => state.property)
  const dispatch = useDispatch()
  const [profileShow,setProfileShow] = useState(false)




  useEffect(() =>{
    dispatch(getAllProperties())
    const data = allProperties&& ( allProperties.find((i) => i.propertyName === propertyNames))
    setData(data);
  }, [allProperties,dispatch,propertyNames ])

  const handleProfilePage = () => {
    setProfileShow(!profileShow)
  }

  return (
    <div className="bg-[#EBE3E0]">
      <Header  profiles={handleProfilePage} profileShow={profileShow}/>
      <div className="text-black fixed top-[7rem] right-[0%]  left-[0%]  md:right-[25%] md:left-[25%]     border-0 shadow-md rounded-md   z-[99999] ">
          {profileShow && <ProfilePage  setProfileShow={setProfileShow} key={2} />}
        </div>
      <PropertyImage  data={data}/>
      <PropertyDescription data={data}/>
      <Reviews data={data} />
      <div className="md:block hidden">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;
