import "./ChatHeader.css";

export default function ChatHeader({ interlocutor }) {
  return (
    <header className='header_container'>
      <img className='avatarImg' alt='user_avatar' src='../avatr1.png' />
      <p className='user_name'>{interlocutor}</p>
    </header>
  );
}
