import React from "react";
import "./Chat.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBody from "../../component/chat_body/ChatBody";
import ChatHeader from "../../component/chat_header/ChatHeader";
import ChatFooter from "../../component/chat_footer/ChatFooter";

var socket = io("https://mysterious-mesa-55870.herokuapp.com", {
  transports: ["websocket"],
});

export default function Chat(props) {
  const location = useLocation();
  const { userName, room } = location.state;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [interlocutor, setInterlocutor] = useState("");

  useEffect(() => {
    socket.emit("join_room", room, (arg) => {
      alert(arg);
    });
    socket.emit(
      "user_joined",
      {
        text: `${userName} join the room`,
        userName,
        date: new Date(),
      },
      room,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on("user_joined", (joinedUser) => {
    setMessages([...messages, joinedUser]);
  });
  socket.on("received_message", (msg) => setMessages([...messages, msg]));

  const sendMessage = (event) => {
    event.preventDefault();
    const message = { text, userName, date: new Date() };
    setMessages([...messages, message]);
    socket.emit("send_message", message, room);
    setText("");
  };

  return (
    <div className='chat_container'>
      <ChatHeader interlocutor={interlocutor} />
      <ChatBody messages={messages} userName={userName} />
      <ChatFooter sendMessage={sendMessage} text={text} setText={setText} />
    </div>
  );
}
