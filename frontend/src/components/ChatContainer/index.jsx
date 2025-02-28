import {useState} from 'react';
import ChatList from '../ChatList';
import NoChatView from '../NoChatView';
import ChatView from '../ChatView';

import './index.css'

const ChatContainer = () => {
    
    
  return (
          <>
             <ChatList/>
             <NoChatView/>
          </>
  )
}

export default ChatContainer;