import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from "./components/Login/index.jsx";
import Register from "./components/Register/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";

import NotFound from "./components/NotFound/index.jsx";
import ChatContainer from "./components/ChatContainer/index.jsx";
import ChatView from "./components/ChatView/index.jsx";
import Navbar from "./components/Navbar/index.jsx";
import AddFriends from "./components/AddFriends/index.jsx";
import SettingsPage from "./components/SettingsPage/index.jsx";
import { ChatProvider } from "./context/ChatContext";

import "./App.css";

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/not-found"];

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
        <Route path="/not-found" element={<NotFound />} />

        <Route
          path="/*"
          element={
            <ChatProvider>
              <div className="main-cont">
                <ProtectedRoute>
                  <ChatContainer />
                </ProtectedRoute>
              </div>
            </ChatProvider>
          }
        />

        <Route
          path="/chat/:chatId"
          element={
            <ChatProvider>
              <div className="main-cont">
                <ProtectedRoute>
                  <ChatView />
                </ProtectedRoute>
              </div>
            </ChatProvider>
          }
        />

        <Route
          path="/add-friends"
          element={
            <ChatProvider>
              <div className="main-cont">
                <ProtectedRoute>
                  <AddFriends />
                </ProtectedRoute>
              </div>
            </ChatProvider>
          }
        />

        <Route
          path="/notifications"
          element={
            <ChatProvider>
              <div className="main-cont">
                <ProtectedRoute>
                  <p>Notifications</p>
                </ProtectedRoute>
              </div>
            </ChatProvider>
          }
        />

        <Route
          path="/settings"
          element={
            <ChatProvider>
              <div className="main-cont">
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              </div>
            </ChatProvider>
          }
        />

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;
