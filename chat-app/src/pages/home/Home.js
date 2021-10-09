import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home(params) {
  const [username, setUsername] = useState("");
  const [interlocutor, setInterlocutor] = useState("");

  return (
    <div className='container'>
      <h1>Elixirator chat</h1>
      <form className='form'>
        <label> your username:</label>
        <input
          className='input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>interlocutor username:</label>
        <input
          className='input'
          value={interlocutor}
          onChange={(e) => setInterlocutor(e.target.value)}
        />

        <Link
          className='submit_button'
          to={
            interlocutor && username
              ? {
                  pathname: username ? "/chat" : null,
                  state: { username, interlocutor },
                }
              : null
          }>
          Submit
        </Link>
      </form>
    </div>
  );
}
