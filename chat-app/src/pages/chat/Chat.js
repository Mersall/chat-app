import React, { useRef } from "react";
import "./Chat.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import moment from "moment";

var socket = io("https://mysterious-mesa-55870.herokuapp.com", {
  transports: ["websocket"],
});

export default function Chat(props) {
  const location = useLocation();
  const { userName, room } = location.state;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const divRref = useRef(null);

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

    divRref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on("user_joined", (joinedUser) => {
    setMessages([...messages, joinedUser]);
  });
  socket.on("received_message", function (msg) {
    handleReceivedMessages(msg);
  });
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const send = (event) => {
    event.preventDefault();
    const message = { text, userName, date: new Date() };
    setMessages([...messages, message]);
    socket.emit("send_message", message, room);
    setText("");
  };

  const handleReceivedMessages = (msg) => {
    let newMsgArr = [];
    newMsgArr.push(msg);
    setMessages([...messages, msg]);
  };
  return (
    <div className='chat_container'>
      <header className='header'>
        <img className='avatarImg' alt='user_avatar' src='../avatr1.png' />
        <p className='user_name'>{userName}</p>
      </header>

      <div ref={divRref} className='chat_body'>
        <ul>
          {messages.map((res, index) => {
            let isCurrentUser = res.userName === userName;
            return (
              <li
                style={{
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                }}
                key={res.date + index}
                className={"msg_text"}>
                {/* && messages.length - 1 === index  */}
                {!isCurrentUser && messages.length - 1 === index ? (
                  <img
                    className='avatarImg'
                    alt='user_avatar'
                    src='../userIcon.png'
                  />
                ) : (
                  <span className='avatarImg' />
                )}

                <div
                  style={{
                    background: isCurrentUser ? "#E1F1F8" : "#F2F2F2",
                  }}
                  className='msg_text_container'>
                  <span>{res.text} </span>
                  <span className='date_text'>
                    {moment(res.date).format("HH:mm:ss")}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <footer>
        <form className='input_container'>
          <input value={text} onChange={handleChange} className='chat_input' />
          <button
            style={{ background: text ? "black" : " #80808087" }}
            disabled={!text}
            onClick={send}
            className='chat_button'>
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
