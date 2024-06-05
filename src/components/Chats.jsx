import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { update_active } from "../redux/slice/activeSlice";
import { update_arrayMsg } from "../redux/slice/arrayMsgSlice";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const dispatchAct = useDispatch()
  const dataMsg= useSelector((state) => {
    return state.arrayMsgSlice;
  });
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

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

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    dispatchAct(update_active(false))
    dispatchAct(update_arrayMsg(true))
  };

  console.log(chats)

  return (<>
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
        className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <div className="PesanInfo">
              <p>{chat[1].lastMessage?.text}</p>
              <p style={{ display:dataMsg.arrayMsg === false ? "none" : "flex" }}>{convertTime(chat[1].date?.seconds, chat[1].date?.nanoseconds)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default Chats;