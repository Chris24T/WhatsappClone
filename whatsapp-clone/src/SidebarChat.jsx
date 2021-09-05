import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import UserContext from "./contexts/userContext";

function SidebarChat({ addNewChat, id, name, content }) {
  const [seed, setSeed] = useState("");
  const { user, setUser } = useContext(UserContext);
  console.log("yser", user);
  function createChat() {
    const roomName = prompt("Name the Chat Group");

    if (roomName) {
      //db action
      db.collection("rooms").add({
        name: roomName,
        users: [user.userId],
      });
    }
  }

  return !addNewChat ? (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last Message</p>
          <p>9+ (unread)</p>
          <p>@ (mentions)</p>
          <p>Last Message Time</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat;
