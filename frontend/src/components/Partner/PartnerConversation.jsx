import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerAllProperties } from "../../redux/actions/property";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import TimeAgo from "react-timeago";
import axios from "axios";
import { server } from "../../server";
import socketIO from "socket.io-client";
const ENDPOINT = "https://socket-fine-stays.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const PartnerConversation = () => {
  const { properties, isLoading } = useSelector((state) => state.property);
  const { partner } = useSelector((state) => state.partner);
  const [messageOpen, setMessageOpen] = useState(1);
  const [propId, setPropId] = useState();
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversations-partner/${propId}`,
          { withCredentials: true }
        );
        setConversations(response.data.propConversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [propId]);

  const handleGetMessages = async (id) => {
    setPropId(id);
  };

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
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    dispatch(getPartnerAllProperties(partner._id));
  }, [dispatch, partner]);

  // active now
  useEffect(() => {
    if (propId) {
      const propid = propId;
      socketId.emit("addUser", propid);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [propId]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== propId);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/messages/get-all-messages/${currentChat?._id}`,
          { withCredentials: true }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: propId,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find((member) => member !== propId);
    socketId.emit("sendMessage", {
      senderId: propId,
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
      lastMessageId: propId,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat?._id}`, {
        lastMessage: newMessage,
        lastMessageId: propId,
      },{withCredentials:true})
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    const receiverId = currentChat?.members.find((member) => member !== propId);

    try {
      await axios
        .post(
          `${server}/messages/create-new-messages`,
          {
            images: file,
            sender: propId,
            text: newMessage,
            conversationId: currentChat._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          socketId.emit("sendMessage", {
            senderId: propId,
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
      lastMessageId: propId,
    });
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat?._id}`,
      {
        lastMessage: "photo",
        lastMessageId: propId,
      },
      {withCredentials:true}
    );
  };

  return (
    <>
      {messageOpen === 1 && (
        <div className="my-10  bg-white mx-10 w-full">
          <div className="flex justify-center py-3 font-Roboto text-[25px] tracking-wide font-medium">
            All Properties Messages
          </div>
          {properties?.map((item, index) => (
            <div
              className=" mt-2 flex  py-2 justify-between items-center px-2 mb-2 bg-slate-200"
              key={index}
            >
              <img
                src={item.images[0].url}
                alt=""
                className="rounded-full w-[50px] h-[50px]  "
              />
              <h1>{item.propertyName}</h1>

              <button
                className=" font-Roboto font-medium p-1 text-white hover:bg-blue-800 bg-blue-700 rounded-md"
                onClick={() => setMessageOpen(2) || handleGetMessages(item._id)}
              >
                Show Messages
              </button>
            </div>
          ))}
        </div>
      )}

      {messageOpen === 2 && (
        <div className="my-10  bg-white mx-10 w-full">
          <div className="flex  justify-between px-1   py-3 font-Roboto text-[25px] tracking-wide font-medium">
            <h1 className="  ">
              <IoIosArrowDropleftCircle
                size={30}
                className=" cursor-pointer"
                onClick={() => setMessageOpen(1)}
              />
            </h1>
            <h1 className="">All Messages</h1>
            <p></p>
          </div>

          {conversations?.map((item, index) => (
            <div className=" mt-2" key={index}>
              <MessagesList
                data={item}
                index={index}
                setMessageOpen={setMessageOpen}
                propId={propId}
                setCurrentChat={setCurrentChat}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            </div>
          ))}
        </div>
      )}

      {messageOpen === 3 && (
        <PartnerInbox
          setMessageOpen={setMessageOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          propId={propId}
          userData={userData}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </>
  );
};

const MessagesList = ({
  data,
  index,
  setMessageOpen,
  propId,
  setCurrentChat,
  setUserData,
  userData,
  online,
  setActiveStatus,
}) => {
  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== propId);
    const getUser = async () => {
      try {
        const response = await axios.get(`${server}/user/user-info/${userId}`,{withCredentials:true});

        setUserData(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [data, propId, online, setActiveStatus, setUserData]);

  return (
    <div
      className=" bg-slate-300 px-2 py-1 flex gap-3 cursor-pointer mb-2"
      onClick={() => setMessageOpen(3) || setCurrentChat(data)}
      key={index}
    >
      <div className="relative ">
        <img
          src={userData?.avatar.url}
          alt=""
          className="rounded-full w-[50px] h-[50px]  "
        />
        {online ? (
          <div className=" bg-green-400 absolute top-[3px] right-[2px] w-[12px] h-[12px] rounded-full" />
        ) : (
          <div className=" bg-[#c7b9b9] absolute top-[3px] right-[2px] w-[12px] h-[12px] rounded-full" />
        )}
      </div>
      <div className=" flex  flex-col">
        <h1 className=" text-[20px] font-Poppins">{userData?.name}</h1>
        <h1 className=" text-[#000c] text-[15px] ">
          {data?.lastMessageId !== userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ":"}
          {data?.lastMessage}
        </h1>
      </div>
    </div>
  );
};

const PartnerInbox = ({
  setMessageOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  propId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);
  console.log(activeStatus);
  return (
    <div className="my-10  bg-white mx-10 w-full flex flex-col justify-between">
      <div className=" bg-slate-200 p-3 flex justify-between items-center">
        <div className=" flex  gap-2">
          <img
            src={userData?.avatar.url}
            alt=""
            className="rounded-full w-[55px] h-[55px]  border   "
          />
          <div className=" ">
            <h1 className=" font-Roboto font-medium text-[18px]">
              {userData?.name}
            </h1>
            <h1 className=" flex ">{activeStatus ? "Active now" : ""}</h1>
          </div>
        </div>
        <div>
          <MdOutlineKeyboardArrowRight
            size={34}
            onClick={() => setMessageOpen(2)}
          />
        </div>
      </div>

      <div className="py-3 h-[60vh] px-3 overflow-y-scroll">
        {messages?.map((item, index) => (
          <div
            className={` p-1 flex ${
              item.sender === propId ? "justify-end" : "justify-start "
            }   items-center   my-2`}
            key={index}
            ref={scrollRef}
          >
            {item.sender !== propId && (
              <img
                src={userData?.avatar.url}
                className="w-[40px] h-[40px] rounded-full border-blue-400 border-[1px]"
                alt=""
              />
            )}

            {item.images && (
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
      {/* <div className="  w-full bg-gray-200 flex p-2"> */}
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

export default PartnerConversation;
