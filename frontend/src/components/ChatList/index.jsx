import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { HiRefresh } from "react-icons/hi";

import { BounceLoader } from "react-spinners";
import ChatListItem from "../ChatListItem";

import ChatContext from "../../context/ChatContext";



import "./index.css";


const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ChatList = () => {
  const { searchText, setSearchText, fetchChatList, filteredChatList, apiStatus} = useContext(ChatContext);
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

    return (
      <ul className="chatlist-container">
        {filteredChatList.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} />
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
      <div className={`chatlist`}>
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
