import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoChatboxEllipsesOutline, IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

const Navbar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    // Extract the path (removing any leading slashes)
    const path = location.pathname.replace("/", "");
    setActiveItem(path || "chatbot"); // Default to chatbot if empty
    
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-cont">
        <Link to="/">
          <TbMessageChatbotFilled className="logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="nav-links">
        <li className={activeItem === "chatbot" ? "active-nav" : ""}>
          <Link to="/">
            <IoChatboxEllipsesOutline className="icons" />
          </Link>
        </li>
        <li className={activeItem === "notifications" ? "active-nav" : ""}>
          <Link className='special-not-icon' to="/notifications">
            <IoNotificationsOutline className="icons" />
            <p className="notification-count">10</p>
          </Link>
        </li>
        <li className={activeItem === "add-friends" ? "active-nav" : ""}>
          <Link to="/add-friends">
            <AiOutlineUsergroupAdd className="icons" />
          </Link>
        </li>
        <li className={activeItem === "settings" ? "active-nav" : ""}>
          <Link to="/settings">
            <IoSettingsOutline className="icons" />
          </Link>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <ul className="small-nav-links">
        <li className={`small-nav-links-list-items ${activeItem === "chatbot" ? "active-nav" : ""}`}>
          <Link to="/">
            <IoChatboxEllipsesOutline className="icons" />
          </Link>
        </li>
        <li className={`small-nav-links-list-items ${activeItem === "notifications" ? "active-nav" : ""}`}>
          <Link className="special-not-icon" to="/notifications">
            <IoNotificationsOutline className="icons" />
            <p className="notification-count">10</p>
          </Link>
        </li>
        <li className={`small-nav-links-list-items ${activeItem === "add-friends" ? "active-nav" : ""}`}>
          <Link to="/add-friends">
            <AiOutlineUsergroupAdd className="icons" />
          </Link>
        </li>
        <li className={`small-nav-links-list-items ${activeItem === "settings" ? "active-nav" : ""}`}>
          <Link to="/settings">
            <IoSettingsOutline className="icons" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
