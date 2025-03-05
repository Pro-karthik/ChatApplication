import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

import { ChatProvider } from "../../context/ChatContext";
import { SocketProvider } from '../../context/SocketContext';

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  return (
  <SocketProvider>
  <ChatProvider>
    <div className="main-cont">
      <Outlet />
    </div>
  </ChatProvider>
  </SocketProvider>)
}

export default ProtectedRoute