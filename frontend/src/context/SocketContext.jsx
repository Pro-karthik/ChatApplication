import {useState,useEffect,createContext,useContext} from 'react';
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
       if(jwtToken){
        const newSocket = io("http://localhost:5000", { 
          auth: { token: jwtToken }, 
          transports: ["websocket"] ,
          autoConnect: true,
          reconnection: true,
          reconnectionDelay: 2000,
        reconnectionAttempts: 10,
        });
        setSocket(newSocket)

        newSocket.on('connect', () => {
          console.log(`socket connection established with id ${newSocket.id}`)
        })

        return () => {
          newSocket.disconnect()
        }
       }
       else{
        setSocket(null)
       }
  },[jwtToken])
   
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;

};

export const useSocket = () => useContext(SocketContext);



