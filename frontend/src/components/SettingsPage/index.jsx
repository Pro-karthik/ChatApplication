import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { useEffect,useState} from 'react'
import { BounceLoader } from "react-spinners";
import { HiOutlinePencilAlt ,HiPencil} from "react-icons/hi";
import {useSocket} from '../../context/SocketContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}



const SettingsPage = () => {  
  const socket = useSocket()
  const [profileDetails,setProfileDetails] = useState({})
const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)

  const navigate = useNavigate()
  const logoutHandler = () => {
  Cookies.remove('jwt_token')
  socket.disconnect()
  navigate('/login')
}

const getProfileDetails = async () => {
  const jwtToken = Cookies.get('jwt_token')
  const apiUrl = 'http://localhost:5000/api/user/profile'
  const options = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }
  setApiStatus(apiStatusConstants.inProgress)
  try {
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      setProfileDetails(data)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  } catch (error) {
    setApiStatus(apiStatusConstants.failure)
  }
}

useEffect(() => {
  
  getProfileDetails()
}, [])



const RetryButton = () => {
   return (
    <div className='retry-container'>
        <button onClick={getProfileDetails} type='button'>Retry</button>
    </div> 
   )
}



const SuccessView = () => {
  const {name,phone,profilePicture,about} = profileDetails
  return (
    <div className='profile-container'>
          <div>
               <h1>Profile picture</h1>
               <img src={profilePicture} alt='profile'/>
               <HiOutlinePencilAlt/>
          </div>
          
          <div>
          <p><span>Name :</span>{name}</p>
          <p><span>Phone Number:</span>{phone}</p>
            </div>
          <p><span>About :</span>{about}</p>
      </div>
  )

}

const LoadingView = () => (
  <div className="setting-loader-container">
    <BounceLoader color="#2056be" size={50} />
  </div>
);

 const renderProfileDetails = () => {
  switch(apiStatus){
    case apiStatusConstants.success:
      return SuccessView()
    case apiStatusConstants.failure:
      return RetryButton()
    case apiStatusConstants.inProgress:
      return LoadingView()
  }
 }

  return (
    <div className='setting-cont'>
    <div className='main-setting-cont'>
      <h1 className='setting-head'>Profile</h1>
      <hr/>
      {
        renderProfileDetails()
      }
      <button
      className='logout-button'
        type="button"
        onClick={logoutHandler}
        >logout</button>
    </div>
    </div>
  );
}

export default SettingsPage;