import { useState, useEffect ,useContext} from "react";
import { FiSend } from "react-icons/fi";
import  ChatContext  from "../../context/ChatContext.jsx";
import socket from "../../socket"; 
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ChatList  from "../ChatList";

import "./index.css";



const Message = ({ message }) => {
  const { type, text } = message;
  return (
    <div className={`chat-message ${type}-message`}>
      <span className="message">{text}</span>
    </div>
  );
};

const ChatView = () => {
  const [name,setName] = useState('')
  const [messages,setMessages] = useState([])
  const [message,setMessage] = useState('')
  const [conversationId,setConversationId] = useState('')
  const { fetchChatList,chatList} = useContext(ChatContext);
  const {chatId} = useParams();

  useEffect(() => {
    fetchChatList()
  },[])
  
  useEffect(() => {
    const fetchConversation = async () => {
       if(chatList.length === 0) return
       const lol = chatList.find((chat) => chat._id === chatId);
      setName(lol.name)
      const receiverPhone = lol.phone
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${jwtToken}` 
        },
        body : JSON.stringify({receiverPhone})
      }
      const response = await fetch('http://localhost:5000/api/user/conversation',options)
      if(response.ok){
        const data = await response.json();
        const convId = data._id
        setConversationId(convId)
      }
      else{
        console.log("Error")
      }
    }
    fetchConversation()
  },[chatId,chatList])
 
  const msgClickHandler = () => {
    if (message.trim() === "") return;  
    setMessages([...messages, { type: "sent", text: message }]);
    setMessage("");
  };
  return (
    <>
    <div className="chatview-chatlist">
       <ChatList />
    </div>
    
    <div className="chatview-container-page">
      <div className="chatview-header">
        <div className="chatview-profile">
          <img
            src="https://claritycareconsulting.co.uk/wp-content/uploads/2023/05/Blank-Profile-Picture.jpg"
            alt="profile"
            className="profile-img"
          />
          <div>
            <h1 className="profile-name">{name}</h1>
            <p className="profile-status">online</p>
          </div>
        </div>
      </div>      
      <div className="chatview-messages">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>

      <div className="chatview-footer">
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message here"
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && msgClickHandler()}
          />
          <button className="send-button" onClick={msgClickHandler}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

export default ChatView;
