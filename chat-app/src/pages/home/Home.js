import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home(params) {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className='container'>
      <h1>Elixirator chat</h1>
      <form className='form'>
        <label>Enter you name:</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <label>Enter Room id:</label>
        <input value={room} onChange={(e) => setRoom(e.target.value)} />

        <Link
          className='submit_button'
          to={{
            pathname: userName ? "/chat" : null,
            state: { userName, room },
          }}>
          Submit
        </Link>
      </form>
    </div>
  );
}
