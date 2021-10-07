import "./Chat.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import moment from "moment";

var socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export default function Chat(props) {
  const location = useLocation();
  const { userName, room } = location.state;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room, (arg) => {
      alert(arg);
    });
    socket.emit("user_joined", {
      text: `${userName} join the room`,
      userName,
      date: new Date(),
    });
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
      <div className='chat_body'>
        <ul>
          {messages.map((res, index) => {
            return (
              <li
                style={{
                  justifyContent:
                    res.userName === userName ? "flex-end" : "flex-start",
                }}
                key={res.date + index}
                className={"msg_text"}>
                <div
                  style={{
                    background:
                      res.userName === userName ? "#ff1717" : "#cd5c5c",
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
          <button disabled={!text} onClick={send} className='chat_button'>
            SEND!
          </button>
        </form>
      </footer>
    </div>
  );
}
