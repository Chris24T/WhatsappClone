import React, { useEffect, useState, useContext } from "react";
import { Avatar, IconButton } from "@material-ui/core";

import "./Chat.css";
import { useParams } from "react-router-dom";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  Send,
} from "@material-ui/icons";
import db, { timeStamp } from "./firebase";
import UserContext from "./contexts/userContext";
import MessageOptions from "./MessageOptions.jsx";

function Chat() {
  const [chatInput, setChatInput] = useState(false); //bool - input exists or not (should change to the value of the input)
  const [chatContent, setChatContent] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { roomId } = useParams(); // as oppsed to passing as prop

  useEffect(() => {
    const chatInputField = document.getElementById("chat__input");

    chatInputField.addEventListener("input", () =>
      handleChatInputChange(chatInputField.value)
    );
    return () => {
      chatInputField.removeEventListener("input", handleChatInputChange);
    };
  }, []);

  useEffect(() => {
    //query "rooms" collection by roomid to get subcollection "messages"
    if (roomId) {
      // Queuing "room" (meta) info listener
      //-> ~duplicate api request as in "sidebar"
      const unSubRoomInfo = db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshotDoc) => {
          const data = snapshotDoc.data();
          setRoomInfo({
            id: roomId,
            ...data,
          });
        });

      // Queuing room "messages" listener
      const unSubMessages = db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          //an array of "messages" objects (with metadata)
          setChatContent(
            snapshot.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
          // console.log(snapshot.docs[0].data());
          // console.log(roomId);
        });
      return () => {
        unSubMessages();
        unSubRoomInfo();
      };
    }
  }, [roomId]); //dependency not strictly nessecary here

  function handleChatInputChange(inputFieldValue) {
    //console.log("chat__input : value change");
    if (inputFieldValue) {
      setChatInput(true);
    } else {
      setChatInput(false);
    }
  }

  function sendMessage(event) {
    event.preventDefault();
    const msg = document.forms["chatInputForm"]["chatInput"].value;
    document.forms["chatInputForm"]["chatInput"].value = "";
    console.log("sending >>>", msg);
    if (!msg) return;
    db.collection("rooms").doc(roomId).collection("messages").add({
      content: msg,
      owner: user.userId,
      timestamp: timeStamp(),
    });
    setChatInput(false);
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar /> {/*Avatar should be taken from context api db */}
        <div className="chat__headerInfo">
          <h3>{roomInfo.name}</h3>
          <p>Last seen at</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {chatContent.map(({ id: messageId, data }) => {
          return (
            <div
              className={`chat__message ${
                data.owner === user.userId && "chat__reciever"
              }`}
              key={data.content}
            >
              <p>
                <span className="chat__name ">{data.owner}</span>
                {data.content}
                <span className="chat__timestamp">
                  {new Date(data.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
              <div className="chat__options--hide">
                <MessageOptions idRing={{ messageId, roomId }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile transform="rotate(45 0 0)" />
        </IconButton>
        <form name="chatInputForm">
          <input
            name="chatInput"
            id="chat__input"
            placeholder="Type a message"
            type="text"
          ></input>
          <button
            onClick={(e) => sendMessage(e)}
            type="submit"
            id="chat__input--send"
          ></button>
        </form>
        <IconButton>{chatInput ? <Send /> : <Mic />}</IconButton>
      </div>
    </div>
  );
}

export default Chat;
