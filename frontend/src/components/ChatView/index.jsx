import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import socket from "../../socket"; 
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

const ChatView = ({receiverPhone }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  console.log(receiverPhone)

  useEffect(() => {
    socket.on("message", (newMessage) => {
      if (newMessage.senderPhone === receiverPhone) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "received", text: newMessage.message },
        ]);
      }
    });

    return () => {
      socket.off("message"); 
    };
  }, [receiverPhone]);

  const msgClickHandler = () => {
    if (message.trim() === "") return;

    
    setMessages([...messages, { type: "sent", text: message }]);

   
    socket.emit("message", { receiverPhone, message });

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
            <h1 className="profile-name">John Doe</h1>
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
