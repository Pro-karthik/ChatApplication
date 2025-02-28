import { io } from "socket.io-client";
import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

const socket = io("http://localhost:5000", { 
  auth: { token: jwtToken }, 
  transports: ["websocket"] 
});

export default socket;
