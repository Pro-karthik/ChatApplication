import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { HiRefresh } from "react-icons/hi";

import Cookies from "js-cookie";
import { BounceLoader } from "react-spinners";
import ChatListItem from "../ChatListItem";
import ChatView from "../ChatView";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [chatSelected, setChatSelected] = useState("");

  const prevChatList = useRef([]);  

  const chatSelectedHandler = useCallback((chatId) => {
    console.log(chatId);
    setChatSelected(chatId);
  }, []);

  const fetchChatList = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");

    if (!jwtToken) {
      setApiStatus(apiStatusConstants.failure);
      return;
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch("http://localhost:5000/api/user/getFriends", options);
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        if (JSON.stringify(prevChatList.current) !== JSON.stringify(data.friends)) {
          setChatList(data.friends);
          prevChatList.current = data.friends;
        }
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      setApiStatus(apiStatusConstants.failure);
    }
  }, []);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  const filteredChatList = useMemo(() => {
    return searchText
      ? chatList.filter((chat) =>
          chat.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : chatList;
  }, [searchText, chatList]);

  const SearchControl = (event) => {
    setSearchText(event.target.value);
  };

  

  const SuccessView = () => {
    if (filteredChatList.length === 0) {
      return (
        <div className="no-chat-container">
          <img
            alt="no contacts"
            src="https://res.cloudinary.com/djauqmosx/image/upload/v1739380420/boycott-abstract-concept-vector-illustration-political-program-consumer-activism-collective-behavior-cancel-culture-moral-purchasing-solidarity-action-public-protest-abstract-metaphor_blh2zz.png"
          />
          <h2>No Chats Found</h2>
        </div>
      );
    }

    console.log(filteredChatList);

    return (
      <ul className="chatlist-container">
        {filteredChatList.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} chatSelectedHandler={chatSelectedHandler} />
        ))}
      </ul>
    );
  };

  const LoadingView = () => (
    <div className="loader-container">
      <BounceLoader color="#2056be" size={50} />
    </div>
  );

  const FailureView = () => (
    <div className="failure-container">
      <p>Failed to load data</p>
    </div>
  );

  const renderThings = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return SuccessView();
      case apiStatusConstants.inProgress:
        return LoadingView();
      case apiStatusConstants.failure:
        return FailureView();
      default:
        return null;
    }
  };

  return (
    <div className="chatlist-main-container">
      <div className={`chatlist ${chatSelected ? "dnone" : "dblock"}`}>
        <div className="chatlist-header">
          <div className="chatlist-title-cont">
            <h1>Chat</h1>
            <HiRefresh className="refresh-icon" onClick={fetchChatList} />
          </div>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search Name"
              value={searchText}
              onChange={SearchControl}
            />
            <FiSearch className="search-icon" />
          </div>
        </div>
        {renderThings()}

      </div>
    </div>
  );
};

export default ChatList;
