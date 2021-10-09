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
  const { username, interlocutor } = location.state;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("register", username);

    // eslint-disable-next-line no-unused-expressions
    () => socket.emit("disconnect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on("private_chat", function (data) {
    let message = { to: data.username, message: data.message, date: data.date };
    setMessages([...messages, message]);
  });

  const sendMessage = (event) => {
    let message = {
      to: interlocutor,
      message: text,
      date: new Date(),
      username,
    };
    setMessages([...messages, message]);
    socket.emit("private_chat", message);
    event.preventDefault();
    setText("");
  };

  return (
    <div className='chat_container'>
      <ChatHeader interlocutor={interlocutor} />
      <ChatBody
        messages={messages}
        username={username}
        interlocutor={interlocutor}
      />
      <ChatFooter sendMessage={sendMessage} text={text} setText={setText} />
    </div>
  );
}
