import React, { useEffect, useState, useContext } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  DonutLarge as DonutLargeIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  SearchOutlined,
} from "@material-ui/icons";

import SidebarChat from "./SidebarChat";
import db from "./firebase";

import "./Sidebar.css";
import UserContext from "./contexts/userContext";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  //   // db change listerner - updates rooms on snapshot change
  //   const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
  //     setRooms(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const roomref = db.collection("rooms");
    const query = roomref.where("users", "array-contains", user.userId);

    query.onSnapshot((snapshot) => {
      // console.dir(snapshot);
      // console.dir(snapshot.docs);
      // console.dir(snapshot.docs[0]);
      //console.dir(snapshot.docs[0].data());

      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      // will need to call api again to get sub collections of the above
      // -> can only get 1 collection at a time
      // + its fields( not its subsollections )
      // -> therefore must query api again to get them
    });
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
          <SidebarChat
            key={room.id}
            id={room.id}
            content={room.content}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
