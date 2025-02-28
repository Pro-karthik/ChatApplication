import {Link} from 'react-router-dom'

import './index.css'

const ChatListItem = ({ chat,chatSelectedHandler }) => {
  const { _id, name,phone} = chat
  let activeClass = ''

  return (
    <li className={`chatlist-item ${activeClass}`}>
      <Link to={`/chat/${_id}`}>
      <img src="https://claritycareconsulting.co.uk/wp-content/uploads/2023/05/Blank-Profile-Picture.jpg" alt={name} className="chatlist-profile-image" />
      <div className="chatlist-profile-details">
         <p className="chatlist-name">{name}</p>
      </div>
      </Link>
      
    </li>
  )
}

export default ChatListItem