import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = (props) => {
  return (
  <>
    <div style={{ display:props.active === false? "none" : "" }} className="sidebar">
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  </>
  );
};

export default Sidebar;