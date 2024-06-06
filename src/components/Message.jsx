import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const dataMsg= useSelector((state) => {
    return state.arrayMsgSlice;
  });

  const convertTime = (seconds, nanoseconds) => {
    const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${dayName}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return timeString;
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      style={{ display:dataMsg.arrayMsg === false ? "none" : "" }}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="spanMessage">{convertTime(message.date.seconds, message.date.nanoseconds)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;