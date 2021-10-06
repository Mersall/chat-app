import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home(params) {
  const [userName, setUserName] = useState(null);

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const submit = (event) => {
    console.log(userName);
    event.preventDefault();
  };
  return (
    <div className='container'>
      <h1>Elixirator chat</h1>
      <form className='form' onSubmit={submit}>
        <label>Enter you name:</label>
        <input onChange={handleChange} />
        <Link
          className='submit_button'
          to={{
            pathname: userName ? "/chat" : null,
            state: { userName: userName },
          }}>
          Submit
        </Link>
      </form>
    </div>
  );
}
