import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    // effect
    setSeed(Math.floor(Math.random() * 5000));

    return () => {
      // cleanup
    };
  }, []);

  function createChat() {
    const roomName = prompt("Name the Chat Group");

    if (roomName) {
      //db action
      db.collection("rooms").add({
        name: roomName,
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
