import { useState, useEffect, useContext } from "react";
import { FiSend } from "react-icons/fi";
import ChatContext from "../../context/ChatContext.jsx";
import {useSocket} from '../../context/SocketContext.jsx'
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ChatList from "../ChatList";
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
  const socket = useSocket()
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const { fetchChatList, chatList } = useContext(ChatContext);
  const [receiverPhone, setReceiverPhone] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const { chatId } = useParams();

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      if (chatList.length === 0) return;
      const chat = chatList.find((chat) => chat._id === chatId);
      setName(chat.name);
      setReceiverPhone(chat.phone);
      socket.connect();
      const jwtToken = Cookies.get("jwt_token");
      const response = await fetch("http://localhost:5000/api/user/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ receiverPhone: chat.phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversationId);
      } else {
        console.log("Error fetching conversation");
      }
    };
    fetchConversation();
  }, [chatId, chatList]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("WebSocket Connected:", socket.id);
      setSocketConnected(true);
      setTimeout(() => {
        socket.emit("joinRoom", { conversationId });
      }, 500); 
    };

    const handleReconnect = () => {
      console.log("WebSocket Reconnected:", socket.id);
      setTimeout(() => {
        socket.emit("joinRoom", { conversationId });
      }, 500); 
    };

    socket.on("connect", handleConnect);
    socket.on("reconnect", handleReconnect);

    if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect(); // Emit immediately if already connected
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("reconnect", handleReconnect);
    };
  }, [conversationId, socket]);
  

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, { type: "received", text: data.message }]);
    };

    socket.on("receiverMessage", handleMessage);
    
    return () => {
      socket.off("receiverMessage", handleMessage); 
    };
  }, []);

  const msgClickHandler = () => {
    if (message.trim() === "") return;
    setMessages((prevMessages) => [...prevMessages, { type: "sent", text: message }]);
    socket.emit("sendMessage", { message, conversationId, receiverPhone });
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
