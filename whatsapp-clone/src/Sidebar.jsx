import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLarge as DonutLargeIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  SearchOutlined,
  SettingsPowerSharp,
} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";

import "./Sidebar.css";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // db change listerner - updates rooms on snapshot change
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {};
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search" type="text"></input>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        {/* <SidebarChat addNewChat />
        <SidebarChat />
        <SidebarChat /> */}
      </div>
    </div>
  );
}

export default Sidebar;