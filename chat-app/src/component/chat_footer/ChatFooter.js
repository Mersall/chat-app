import "./ChatFooter.css";

export default function ChatFooter({ sendMessage, text, setText }) {
  return (
    <footer>
      <form className='input_container'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='chat_input'
        />
        <button
          style={{ background: text ? "black" : " #80808087" }}
          disabled={!text}
          onClick={sendMessage}
          className='chat_button'>
          Send
        </button>
      </form>
    </footer>
  );
}
