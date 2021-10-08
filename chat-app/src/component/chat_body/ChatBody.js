import moment from "moment";
export default function ChatBody({ messages, userName }) {
  return (
    <div className='chat_body'>
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
  );
}
