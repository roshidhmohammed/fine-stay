import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const PropertyRegister = () => {
  const [email, setEmail] = useState("");
  const [personName, setPersonName] = useState("");
  const [password, setPassword] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [passwordError, setPasswordError] = useState("");

  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (newPassword) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    const isPasswordValid = passwordRegex.test(newPassword);

    if (!isPasswordValid) {
      setPasswordError(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${server}/partner/create-partner`, {
        personName,
        email,
        propertyName,
        password,
        mobileNumber,
        avatar,
      })
      .then((res) => {
        toast.success(res.data.message);
        setPersonName("");
        setPropertyName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setMobileNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen  bg-teal-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto mb-5 sm:w-full sm:max-w-md">
            <h1 className="mt-2 text-center font-Roboto text-3xl font-extrabold text-gray-900">
              Register as a partner
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your full name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="personName"
                  required
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Property Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="propertyName"
                  required
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="mobileNumber"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete=""
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  className=" block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <p className=" text-red-600">{passwordError}</p>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
              </label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png,.avif, .webp"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
              >
                Sign Up
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already listed your property?</h4>
              <Link to="/login-partner" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyRegister;
