import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import SearchBar from "../components/SearchList/SearchBar";
import PropertyFilter from "../components/SearchList/PropertyFilter";
import PropertyListPage from "../components/SearchList/PropertyListPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../redux/actions/property";
import Footer from "../components/Layout/Footer";

const Searchresults = () => {
  const { allProperties } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [isApply, setIsApply] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [profileShow, setProfileShow] = useState(false);

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  let min = [];
  allProperties &&
    allProperties.map((item) => {
      return min.push(item.price);
    });

  const handleProfilePage = () => {
    setProfileShow(!profileShow);
  };

  const minPrice = min.sort((a, b) => a - b);
  const [minVal, setMinVal] = useState(minPrice[0]);
  const [maxVal, setMaxVal] = useState(minPrice[minPrice.length - 1]);

  const filterProperty =
    allProperties &&
    allProperties.filter((item) => {
      const price = item.price >= minVal && item.price <= maxVal;
      const isCategoryMatch = filterCategory.includes(item.category);
      const propertyAmenities = item.amenities || [];
      const isAmenityMatch = filterAmenities.every((amenity) =>
        propertyAmenities.includes(amenity)
      );
      return price && isCategoryMatch && isAmenityMatch;
    });
  console.log(filterProperty);

  return (
    <div className="bg-[#EBE3E0]">
      <Header profiles={handleProfilePage} profileShow={profileShow} />
      <SearchBar
        profiles={handleProfilePage}
        profileShow={profileShow}
        setProfileShow={setProfileShow}
      />
      <PropertyFilter
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        setIsApply={setIsApply}
        isApply={isApply}
        setFilterCategory={setFilterCategory}
        filterCategory={filterCategory}
        setFilterAmenities={setFilterAmenities}
        filterAmenities={filterAmenities}
        minVal={minVal}
        setMinVal={setMinVal}
        maxVal={maxVal}
        setMaxVal={setMaxVal}
        min={minPrice[0]}
        max={minPrice[minPrice.length - 1]}
        onChange={({ min, max }) => console.log(`min=${min}, max=${max}`)}
      />
      <PropertyListPage
        isApply={isApply}
        minVal={minVal}
        maxVal={maxVal}
        filterCategory={filterCategory}
        filterAmenities={filterAmenities}
      />
      <Footer />
    </div>
  );
};

export default Searchresults;
