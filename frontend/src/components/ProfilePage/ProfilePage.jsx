import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiNavigation } from "react-icons/fi";
import LogOut from "../LogOut/LogOut";
import { BsPersonFill } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { BiListCheck } from "react-icons/bi";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllBookings } from "../../redux/actions/booking";
import { getAllProperties } from "../../redux/actions/property";
import { AiFillStar, AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TimeAgo from "react-timeago";
import svg from "../../Assests/svg/circle-scatter-haikei2.svg";
import { GrGallery } from "react-icons/gr";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ProfilePage = ({ profile, setProfileShow, profileShow }) => {
  const [select, setSelect] = useState("1");
  const { allBookings } = useSelector((state) => state.bookings);
  const { allProperties } = useSelector((state) => state.property);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber);
  const [avatar, setAvatar] = useState(user?.avatar.url);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [propChat, setPropChat] = useState();
  const [chatShow, setChatShow] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeStatus, setActiveStatus] = useState(null);
  const [conversations, setConversations] = useState();
  const scrollRef = useRef(null);
  const [images, setImages] = useState();

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getAllProperties());
  }, [dispatch]);

  const findBookings =
    allBookings &&
    allBookings.filter((item) => {
      return (
        item.userId === user._id &&
        (item.bookingStatus === "booked" || item.bookingStatus === "checked-in")
      );
    });

  const findCheckedOutBooking =
    allBookings &&
    allBookings.filter((item) => {
      return item.userId === user._id && item.bookingStatus === "checked-out";
    });

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const isNameExist = user?.name.toLowerCase().includes(name.toLowerCase());
  const isEmailExist = user?.email.toLowerCase().includes(email.toLowerCase());
  const isAvatarUrlExist = user?.avatar.url
    .toLowerCase()
    .includes(avatar.toLowerCase());

  const handlePropertyAndBookingId = (property, booking) => {
    setPropertyId(property);
    setBookingId(booking);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/user/update-profile`,
        {
          id: user._id,
          name,
          email,
          mobileNumber,
          avatar,
          prevAvatarId: user.avatar.public_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, "2000");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `${server}/property/add-review`,
        {
          reviewComment,
          rating,
          propertyId,
          bookingid: bookingId,
          userName: user.name,
          userId: user._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleChat = async (id, name, url) => {
    if (isAuthenticated) {
      const groupTitle = id + user._id;
      const userId = user._id;
      const propertyId = id;

      await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId,
          propertyId,
        },
        { withCredentials: true }
      );
      setChatShow(true);
      setPropChat({ id: id, name: name, url: url });
    } else {
      toast.error("please login to continue");
    }
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversations-user/${user?._id}/${propChat.id}`,
          { withCredentials: true }
        );
        setConversations(response.data.userConversation);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user, propChat]);

  // active now
  useEffect(() => {
    if (user) {
      const propId = user?._id;
      socketId.emit("addUser", propId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        images: data.images,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat[0].members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/messages/get-all-messages/${currentChat[0]?._id}`,
          { withCredentials: true }
        );

        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat[0]?._id,
    };
    const receiverId = currentChat[0]?.members.find(
      (member) => member !== user?._id
    );
    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/messages/create-new-messages`, message, {
            withCredentials: true,
          })
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });
    await axios
      .put(
        `${server}/conversation/update-last-message/${currentChat[0]._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user?._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const onlineCheck = async (chat) => {
      const chatMembers =
        chat && chat[0].members.find((member) => member !== user?._id);
      const online = onlineUsers?.find((user) => user.userId === chatMembers);

      return online ? setActiveStatus(true) : setActiveStatus(false);
    };

    setCurrentChat(conversations);
    onlineCheck(conversations);
  }, [conversations, onlineUsers, user, setActiveStatus]);

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendinghandler(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendinghandler = async (file) => {
    const receiverId = currentChat[0]?.members.find(
      (member) => member !== user?._id
    );

    try {
      await axios
        .post(
          `${server}/messages/create-new-messages`,
          {
            images: file,
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat[0]?._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          socketId.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            images: res.data.message.images,
          });

          setMessages([...messages, res.data.message]);

          setImages();
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateLastMessageForImage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat[0]?._id}`,
      {
        lastMessage: "photo",
        lastMessageId: user?._id,
      },
      { withCredentials: true }
    );
  };

  return (
    <>
      {chatShow === false ? (
        <div
          className=" pb-5 h-[80vh] overflow-y-scroll pl-2 "
          style={{
            backgroundImage: `url(${svg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex mb-28 text-white font-Roboto px-3  pt-3 font-bold  justify-between items-center ">
            <button
              className=" border-2 rounded-lg shadow-md tracking-wide px-3 py-1 hover:bg-black"
              onClick={() => setProfileShow(false)}
            >
              Close
            </button>
            <button className="">
              <LogOut />
            </button>
          </div>
          <div className="  bg-white rounded-md mx-2">
            <div className="      flex justify-center pb-9 relative ">
              <img
                src={user?.avatar.url}
                alt=""
                className="w-[7rem] h-[7rem] mt-[-3rem] rounded-full border-2 border-gray-200 shadow-md  "
              />
            </div>
            <div className=" flex justify-around   font-Poppins font-medium border bg-[#e2ebf0] rounded-md  items-center  pt-3  px-2  gap-5  overflow-x-scroll  mt-5  ">
              <div
                className={` flex items-center px-2 py-1 hover:bg-black hover:rounded-md      hover:text-red-600 ${
                  select === "1" ? "bg-black  rounded-md text-red-600" : ""
                }  `}
                onClick={() => setSelect("1")}
              >
                <BsPersonFill size={30} className="mr-" />
                <p className="flex items-center">Profile</p>
              </div>
              <div
                className={`flex items-center px-2 py-1 hover:bg-black hover:rounded-md      hover:text-red-600 ${
                  select === "2" ? "bg-black  rounded-md text-red-600" : ""
                }`}
                onClick={() => setSelect("2")}
              >
                <TbBrandBooking size={30} className="mr-" />
                <p className="flex items-center">Ongoing Bookings</p>
              </div>
              <div
                className={`flex items-center px-2 py-1 hover:bg-black hover:rounded-md      hover:text-red-600 ${
                  select === "3" ? "bg-black  rounded-md text-red-600" : ""
                }`}
                onClick={() => setSelect("3")}
              >
                <BiListCheck size={30} className="mr-" />
                <p className="flex items-center">Previous Bookings</p>
              </div>
            </div>
            {select === "1" && (
              <div className=" flex justify-center items-center mt-5    ">
                <div className="border-2 rounded-md  border-gray-600 shadow-md   px-5 py-5 w-full  md:w-[50%] mb-5">
                  <div className=" flex flex-col ">
                    <label className=" font-Roboto font-medium text-lg ">
                      Full Name
                    </label>
                    <input
                      type="text"
                      autoComplete=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      className="border ml-2 pl-2  active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                  </div>
                  <div className=" flex flex-col mt-2 ">
                    <label className=" font-Roboto font-medium text-lg ">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border ml-2 pl-2 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 "
                    />
                  </div>
                  <div className=" flex flex-col mt-2  ">
                    <label className=" font-Roboto font-medium text-lg  ">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobileNumber"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="border ml-2 pl-2 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                  </div>
                  <div className=" flex flex-col mt-2  ">
                    <label className=" font-Roboto font-medium text-lg  ">
                      Change Profile Image
                    </label>
                    <div className=" flex justify-between">
                      <label className=" flex  ml-3 font-Roboto  text-white font-medium  border px-2 py-1 bg-blue-600 hover:bg-blue-700 w-[7rem]">
                        <input
                          type="file"
                          name="avatar"
                          onChange={handleFileInputChange}
                          accept=".jpg,.jpeg,.png"
                          id="file-input"
                          // value={user.avatar}
                          className=" sr-only"
                        />
                        Upload a file
                      </label>
                      <div className="">
                        <img
                          src={avatar}
                          alt="avatar"
                          className="rounded-full w-[2rem] h-[2rem]"
                        />
                      </div>
                    </div>
                  </div>
                  {(!isNameExist ||
                    !isEmailExist ||
                    mobileNumber !== user.mobileNumber ||
                    !isAvatarUrlExist) && (
                    <div className=" flex justify-end mt-3">
                      <button
                        type="submit"
                        className=" border-2 py-1  font-Roboto font-bold  tracking-wide px-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white shadow-md"
                        onClick={(e) => handleUpdate(e)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {select === "2" &&
              findBookings &&
              findBookings.map((i, index) => {
                const findBookingProperty =
                  allProperties &&
                  allProperties.filter(
                    (item, index) => item._id === i.propertyId
                  );
                return (
                  <div className="bg-[#EBE3E0] mb-1 mt-1 z-[99999] md:mx-20 border  pt-5">
                    <div className="flex justify-center mt-2 text-emerald-800 font-Roboto font-bold text-lg">
                      {i.bookingStatus === "booked"
                        ? "Your Booking was confirmed"
                        : ` You will  check-out room on ${i.checkOutDate.slice(
                            0,
                            10
                          )} `}
                    </div>
                    <div
                      className={` flex ${
                        i.bookingStatus === "booked"
                          ? "justify-between"
                          : "justify-end"
                      } px-1  items-center mr-1`}
                    >
                      {i.bookingStatus === "booked" && (
                        <div>
                          <button
                            className=" font-Roboto font-medium bg-[#00302D] px-2 text-gray-100 rounded-lg tracking-wide text-md py-2  hover:bg-[#00302df9]"
                            onClick={() =>
                              handleChat(
                                findBookingProperty[0]._id,
                                i.propertyName,
                                findBookingProperty[0].images[0].url
                              )
                            }
                          >
                            send message
                          </button>
                        </div>
                      )}
                      <div>
                        <Link
                          to={`/navigation/${findBookingProperty[0]?.currentLocation?.latitude}/${findBookingProperty[0]?.currentLocation?.longitude}`}
                        >
                          <button className=" flex border-2 px-1 font-Roboto font-medium tracking-wide rounded-lg text-md border-black py-1 hover:border-gray-600 bg-[#221C35] text-gray-100 hover:bg-[#0f0920] hover:text-gray-100">
                            <FiNavigation size={20} className="mt-1 mr-1 " />
                            Get Direction
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="     mx-1 mb-3  rounded-md pl-2  mt-3 ">
                      <div className=" flex justify-start  ">
                        <div className=" min-w-[6rem] min-h-[6rem] mr-2">
                          <img
                            src={findBookingProperty[0]?.images[0]?.url}
                            alt=""
                            className="w-[6rem] h-[6rem] "
                          />
                        </div>
                        <div className=" flex flex-col">
                          <div className=" font-Roboto font-medium text-lg">
                            {i.propertyName}
                          </div>
                          <div className=" font-Roboto font-medium text-md">
                            {findBookingProperty[0]?.currentLocation?.placeName}
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-col font-Roboto">
                        <div>
                          <span className=" font-Roboto font-medium text-green-900  tracking-wide text-lg mr-1">
                            Check_in:
                          </span>
                          {i.checkinDate}
                        </div>
                        <div>
                          <span className=" font-Roboto text-red-900 font-medium  tracking-wide text-lg mr-1">
                            Check_out:
                          </span>
                          {i.checkOutDate}
                        </div>
                        <div>
                          <span className=" font-Roboto text-emerald-900 font-medium  tracking-wide text-lg mr-1">
                            Rooms:
                          </span>
                          {i.roomsCount}
                        </div>
                        <div>
                          <span className=" font-Roboto font-medium text-blue-900 tracking-wide text-lg mr-1">
                            Payment Type:
                          </span>
                          {i.paymentType}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {select === "3" &&
              findCheckedOutBooking &&
              findCheckedOutBooking.map((i, index) => {
                const findCheckedoutBookingProperty =
                  allProperties &&
                  allProperties.filter(
                    (item, index) => item._id === i.propertyId
                  );
                const isBooked =
                  findCheckedoutBookingProperty &&
                  findCheckedoutBookingProperty[0]?.reviews.filter(
                    (is) => is.bookingId === i._id
                  );
                return (
                  <div className="bg-white z-[99999] md:mx-20 border  mt-5">
                    <div className=" flex justify-start gap-4 ">
                      <div>
                        <img
                          src={
                            findCheckedoutBookingProperty &&
                            findCheckedoutBookingProperty[0]?.images[0].url
                          }
                          alt=""
                          className="min-w-[9rem] max-w-[9rem] max-h-[9rem] min-h-[9rem] "
                        />
                      </div>
                      <div className=" flex flex-col ">
                        <div className=" font-Roboto  font-medium text-sm  md:text-lg">
                          {i.propertyName}
                        </div>
                        <div className=" font-Roboto ">
                          {findCheckedoutBookingProperty &&
                            findCheckedoutBookingProperty[0]?.currentLocation
                              .placeName}
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-end">
                      <Link to={`/invoice/${i._id}`}>
                        <button className=" p-2 text-white bg-[#00302D] hover:bg-[#00302df9] rounded-md ">
                          Download Invoice
                        </button>
                      </Link>
                    </div>
                    {isBooked?.length === 0 && (
                      <div>
                        <div className=" mt-3 ">
                          <h1 className=" font-Roboto font-medium text-lg">
                            How was your stay?
                          </h1>
                        </div>
                        <form onSubmit={handleReviewSubmit}>
                          <div className="mt-2 mb-1 mx-8 px-1 bg-gray-200  border">
                            <div className="  flex justify-center   ">
                              {[1, 2, 3, 4, 5].map((star, index) => (
                                <div
                                  className=" px-1 py-2  "
                                  key={star}
                                  onClick={() => setRating(star)}
                                >
                                  <AiFillStar
                                    size={24}
                                    color={`${
                                      star <= rating ? "blue" : "black"
                                    } `}
                                    className="focus:outline-none"
                                  />
                                </div>
                              ))}
                            </div>

                            <div className=" mt-1 flex  flex-col px-1 ">
                              <div>
                                <h1 className=" font-medium font-Roboto ">
                                  Give us your valuable feedback!!!
                                </h1>
                              </div>
                              <div className=" mx-1 flex justify-center mt-2 ">
                                <textarea
                                  name=""
                                  id=""
                                  cols="30"
                                  rows="5"
                                  onChange={(e) =>
                                    setReviewComment(e.target.value)
                                  }
                                  maxLength="100"
                                  className=" border border-blue-500"
                                />
                              </div>
                              <div className=" flex justify-end mt-3 mb-1 mr-2">
                                <button
                                  type="submit"
                                  className="  py-1 rounded-lg shadow-md bg-blue-800 text-gray-100 hover:bg-blue-950 hover:text-white px-2 font-Roboto font-medium "
                                  onClick={() =>
                                    handlePropertyAndBookingId(
                                      i.propertyId,
                                      i._id
                                    )
                                  }
                                >
                                  submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          className="  h-[85vh] py-4   px-4 "
          style={{
            backgroundImage: `url(${svg})`,
            backgroundSize: "cover",
          }}
        >
          <UserInbox
            setChatShow={setChatShow}
            propId={propChat?.id}
            propName={propChat?.name}
            url={propChat?.url}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            currentChat={currentChat}
            messages={messages}
            userId={user?._id}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            handleImageUpload={handleImageUpload}
            setMessages={setMessages}
          />
        </div>
      )}
    </>
  );
};

const UserInbox = ({
  setChatShow,
  propName,
  url,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  scrollRef,
  handleImageUpload,
  activeStatus,
}) => {
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages, scrollRef]);

  return (
    <div className=" flex flex-col  bg-white justify-between mt-3 py- px-">
      <div className=" flex justify-between items-center bg-slate-200 p-2 rounded-md  ">
        <div className=" flex justify-start gap-2">
          <div>
            <img src={url} alt="" className="h-[50px] w-[50px] rounded-full" />
          </div>
          <div className="">
            <h1 className=" font-Roboto font-medium">{propName}</h1>
            <h1 className=" flex ">{activeStatus ? "Active now" : ""}</h1>
          </div>
        </div>
        <div>
          <MdOutlineKeyboardArrowRight
            size={34}
            onClick={() => setChatShow(false)}
          />
        </div>
      </div>
      <div className="py-3 h-[60vh] px-3 overflow-y-scroll">
        {messages?.map((item, index) => (
          <div
            className={` p-1 flex ${
              item.sender === userId ? "justify-end" : "justify-start "
            }   items-center   my-2`}
            key={index}
            ref={scrollRef}
          >
            {item.sender !== userId && (
              <img
                src={url}
                className="w-[40px] h-[40px] rounded-full border-blue-400 border-[1px]"
                alt=""
              />
            )}
            {item.images?.url && (
              <div>
                <img
                  src={item.images.url}
                  alt=""
                  className="w-[200px] h-[200px] object-cover rounded-[10px] mr-2"
                />
                <p className="text-[12px] mt-1  text-[#000000d3] flex justify-end ">
                  <TimeAgo date={item.createdAt} live={false} title={false} />
                </p>
              </div>
            )}

            {(item.text !== "" || item.text === undefined) &&
              (!item.images || !item.images?.url) && (
                <div className="">
                  <h1 className="bg-green-500 text-white p-2  flex justify-center rounded-md ">
                    {item.text}
                  </h1>
                  <p className="text-[12px] mt-1  text-[#000000d3] flex justify-end ">
                    <TimeAgo date={item.createdAt} live={false} title={false} />
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>
      <form
        className="  relative flex justify-between w-full items-center p-3"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            id="image"
            name=""
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <GrGallery size={20} className=" cursor-pointer" />
          </label>
        </div>
        <div className=" w-full">
          <input
            type="text"
            className="border w-full p-2   bg-slate-100"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your messages..."
            required
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-6 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
