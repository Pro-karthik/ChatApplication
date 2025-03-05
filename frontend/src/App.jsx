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

        <Route element={<ProtectedRoute />}>
          <Route
            path="/*"
            element={
              <ChatContainer />
            }
          />

          <Route
            path="/chat/:chatId"
            element={
              <ChatView />
            }
          />

          <Route
            path="/add-friends"
            element={
              <AddFriends />
            }
          />

          <Route
            path="/notifications"
            element={
              <p>Notifications</p>}/>

          <Route
            path="/settings"
            element={
              <SettingsPage />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
};

export default App;
