import axios from "axios";
import React, { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleContact = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/admin/send-news-letter`,
        {
          name,
          email,
          message,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setMessage("");
        navigate("/");
      });
  };
  return (
    <div className="bg-[#EBE3E0] p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700">
          If you have any questions or need assistance, please feel free to
          contact us. We're here to help you with your inquiries.
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p className="text-gray-700">Email: roshidhmohammed777@gmail.com</p>
          <p className="text-gray-700">Phone: 7511190408</p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Send us a Message</h2>
          <form className="mt-4" onSubmit={handleContact}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
