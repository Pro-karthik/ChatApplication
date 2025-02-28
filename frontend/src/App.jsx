import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login/index.jsx';
import Register from './components/Register/index.jsx';
import ProtectedRoute from './components/ProtectedRoute/index.jsx';

import NotFound from './components/NotFound/index.jsx';
import ChatContainer from './components/ChatContainer/index.jsx';
import ChatView from './components/ChatView/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import AddFriends from './components/AddFriends/index.jsx';
import SettingsPage from './components/SettingsPage/index.jsx'


import './App.css';

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register","/not-found"];

  return (
    
      <div className="bg-container">
        {!hideNavbar.includes(location.pathname) && (
          <div className="navbar-container">
            <Navbar />
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/*" 
            element={
              <div className='main-cont'>
                <ProtectedRoute>
                  <ChatContainer />
                </ProtectedRoute>
              </div>
            } 
          />

          <Route path='/chat/:chatId' element={<div className='main-cont'>
                <ProtectedRoute>
                  <ChatView/> 
                </ProtectedRoute>
                </div>} />
                
          <Route path="/add-friends" element={<div className='main-cont'>
                <ProtectedRoute>
                  <AddFriends />
                </ProtectedRoute>
              </div>} />
          <Route path="/notifications" element={<div className='main-cont'>
                <ProtectedRoute>
                  <p>Notifications</p>
                </ProtectedRoute>
              </div>} />
          <Route path="/settings" element={<div className='main-cont'>
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              </div>} />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
  );
};

export default App;
