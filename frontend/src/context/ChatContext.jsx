import {useState,createContext,useEffect,useCallback,useMemo,useRef} from 'react'; 
import Cookies from "js-cookie"; 

export const ChatContext = createContext();

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export const ChatProvider = ({children}) => {
   const [chatList, setChatList] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

   const prevChatList = useRef([])

   const fetchChatList = useCallback(async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get("jwt_token")
      if(!jwtToken){
         setApiStatus(apiStatusConstants.failure)
         return
      }
      const options = {
        method : "GET",
        headers : {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwtToken}`
        }
      }
      const response = await fetch("http://localhost:5000/api/user/getFriends", options)
      const data = await response.json()
      if(response.ok){
        if(JSON.stringify(prevChatList.current) !== JSON.stringify(data.friends)){
          setChatList(data.friends)
          prevChatList.current = data.friends 
        }
        setApiStatus(apiStatusConstants.success)
      }
      else{
        setApiStatus(apiStatusConstants.failure)  
      }
   })

   useEffect(() => {
      fetchChatList()
   },[fetchChatList])

   const filteredChatList = useMemo(() => {
    const flist = searchText ? chatList.filter((chat) => chat.name.toLowerCase().includes(searchText.toLowerCase())) : chatList
    return flist
   })

   return <ChatContext.Provider value={{chatList,searchText,apiStatus,setSearchText,fetchChatList,filteredChatList}}>
    {children}
   </ChatContext.Provider>

}

