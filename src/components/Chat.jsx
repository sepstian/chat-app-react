import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useDispatch, useSelector } from "react-redux";
import { update_active } from "../redux/slice/activeSlice";

const Chat = (props) => {
  const { data } = useContext(ChatContext);
  const dispatch = useDispatch()
  const dataMsg= useSelector((state) => {
    return state.arrayMsgSlice;
  });
  console.log(dataMsg.arrayMsg);

  const handleOffActive = () => {
    dispatch(update_active(true))
  };

  return (
    <div style={{ display:props.active === false ? "block":""}} className="chat">
      <div className="chatInfo">
        <div style={{ display:"flex", alignItems:"center", gap:"10px"}}>
          <FaArrowLeft style={{ display:dataMsg.arrayMsg === false ? "none" : "flex", cursor:"pointer" }} onClick={() => handleOffActive()}/>
          <span style={{ display: dataMsg.arrayMsg === false ? "none" : "flex" }}>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input active={dataMsg.arrayMsg}/>
    </div>
  );
};

export default Chat;