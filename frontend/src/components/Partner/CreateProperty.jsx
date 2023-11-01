import React, { useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import PropertyLocationField from "../../components/Partner/Layout/PropertyAdd/PropertyLocationField";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createProperty } from "../../redux/actions/property";
import { getAllCategories } from "../../redux/actions/categories";
import { getAllAmenities } from "../../redux/actions/amenities";

const CreateProperty = () => {
  const { partner } = useSelector((state) => state.partner);
  const { allCategories } = useSelector((state) => state.categories);
  const { allAmenities } = useSelector((state) => state.amenities);
  const dispatch = useDispatch();
  const [propertyName, setPropertyName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [roomsCount, setRoomscount] = useState("");
  const [amenitiesOption, setAmenititesOption] = useState(false);
  const [errors, setErrors] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    placeName: "",
  });

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllAmenities());
  }, [dispatch]);

  const handleItemToggle = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((value) => value !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      setImages(files);
    } else {
      toast.error("please upload minimum 5 images");
    }
  };
  const partnerId = partner?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImage = await Promise.all(
      images.map(async (img) => {
        const formData = new FormData();
        formData.append("file", img);
        formData.append(
          "upload_preset",
          `${process.env.REACT_APP_UPLOAD_PRESET}`
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          formData
        );

        return response.data.secure_url;
      })
    );

    dispatch(
      createProperty({
        propertyName,
        description,
        category,
        price,
        images: uploadedImage,
        roomsCount,
        amenities,
        currentLocation,
        partnerId,
      })
    );
  };

  return (
    <div className="sm:w-[50%] w-[70%]  h-[80vh] my-8  bg-[#dfdada]  shadow rounded-md overflow-y-scroll  ">
      <h2 className=" font-Poppins font-medium text-center p-5  text-[30px] border-b border-gray-400">
        Add your property
      </h2>
      {/* property details */}
      <form onSubmit={handleSubmit}>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Property Name<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <input
            type="text"
            name="propertyName"
            value={propertyName}
            required
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="Enter your property name..."
            className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Description<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter the property description..."
            className=" ml-1 mt-2 appearance-none w-[97%] border pt-3 border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Category<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" w-[97%] mt-2 border h-[35px] rounded-sm ml-1 border-gray-300 "
          >
            <option
              value="choose a category"
              className="bg-gray-900 text-white"
            >
              Choose a category
            </option>
            {allCategories &&
              allCategories.map((item, index) => (
                <option
                  value={item.categoryName}
                  key={item.categoryName}
                  className="bg-gray-900  text-white "
                >
                  {item.categoryName}
                </option>
              ))}
          </select>
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Total no of rooms<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <input
            type="number"
            min={1}
            name="roomsCount"
            value={roomsCount}
            onChange={(e) => setRoomscount(e.target.value)}
            required
            placeholder="Enter the property price..."
            className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Price<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the property price..."
            className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Amenities<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>
          <p
            className="w-[97%] border border-gray-500 flex   justify-between h-auto pt-1 pl-2 ml-1"
            onClick={() => setAmenititesOption(!amenitiesOption)}
          >
            {amenities.length === 0 && <p>Select</p>}
            <div className="flex flex-wrap">
              {amenities.map((item, index) => (
                <input type="text" key={index} value={item} readOnly />
              ))}
            </div>
            {!amenitiesOption ? (
              <MdArrowDropDown size={25} className="mt-" />
            ) : (
              <MdArrowDropUp size={25} />
            )}
          </p>
          {amenitiesOption && (
            <div className="grid grid-cols-3 mt-5 gap-2 ">
              {allAmenities &&
                allAmenities.map((item, index) => {
                  return (
                    <div
                      className="flex font-Roboto font-normal text-md items-center justify-start"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleItemToggle(item.AmenitiesName)}
                      />
                      <span className="ml-1">{item.AmenitiesName}</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Property photos
            <span className="text-red-500 text-md">* (minimum 5) </span>
            <span>:</span>
          </label>
          <input
            type="file"
            name="images"
            // value={images}
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileInputChange}
            min={5}
            multiple
            required
            className=" ml-1 mt-2 appearance-none w-[97%] py-1  border  h-[35px] border-gray-500 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
          />
          {errors && <p style={{ color: "red" }}>{errors}</p>}
        </div>
        <div className="mt-2 ml-1 pb-2">
          <label className=" font-Roboto ">
            Set property address<span className="text-red-400 text-lg">* </span>
            <span>:</span>
          </label>

          <div className=" flex justify-between border   h-[70px] appearance-none w-[97%] border-gray-500 ml-1 items-center rounded-sm px-3 py-2 text-sm placeholder-gray-400  ">
            <input
              type="text"
              readOnly
              name="currentLocation"
              value={currentLocation.placeName}
              required
              placeholder="Choose property location"
              className=" ml-1 mt-2 appearance-none w-[90%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
            />
            <BiCurrentLocation
              size={25}
              color=""
              className="text-blue-700 mt-2"
              onClick={() => setShowMap(!showMap)}
            />
          </div>
          {showMap && (
            <PropertyLocationField
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          )}
        </div>
        <div className=" flex  justify-center items-center mt-5 mb-2  pt-3">
          <button
            type="submit"
            className="mt-2 mx-3 font-Roboto font-medium cursor-pointer appearance-none text-center block w-full px-3  py-1  shadow-md bg-blue-700 hover:bg-blue-800 text-gray-100  rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
          >
            Add Your Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;
