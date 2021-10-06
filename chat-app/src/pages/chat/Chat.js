import "./Chat.css";
import { useLocation } from "react-router";
import { useState } from "react";
import { io } from "socket.io-client";
import moment from "moment";

var socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export default function Chat(props) {
  const location = useLocation();
  const { userName } = location.state;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  socket.on("chat_message", function (msg) {
    handleReceivedMessages(msg);
  });

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const send = (event) => {
    event.preventDefault();
    socket.emit("chat_message", { text, userName, date: new Date() });
    setText("");
  };

  const handleReceivedMessages = (msg) => {
    let newMsgArr = [];
    newMsgArr.push(msg);
    setMessages([...messages, msg]);
  };
  return (
    <div className='chat_container'>
      <div className='header'>
        <img className='avatarImg' alt='user_avatar' src='../avatr1.png' />
        <p className='user_name'>{userName}</p>
      </div>
      <div className='chat_body'>
        <ul>
          {messages.map((res) => {
            return (
              <li className='msg_text'>
                <div className='msg_text_container'>
                  <span>{res.text} </span>
                  <span>{moment(res.date).fromNow()}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='footer'>
        <form className='input_container'>
          <input value={text} onChange={handleChange} className='chat_input' />
          <button onClick={send} className='chat_button'>
            SEND!
          </button>
        </form>
      </div>
    </div>
  );
}
