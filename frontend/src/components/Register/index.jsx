import { useState ,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import Cookies from "js-cookie";

import { TbMessageChatbotFilled } from "react-icons/tb"

import './index.css'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  
  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken){
        Navigate('/')
    }
  })
  

  const handleSubmit = async (event) => {
         event.preventDefault()
         const data = {name :username,phone,password}
         const url = 'http://localhost:5000/api/auth/register'
         const options = {
              method : "POST",
              headers : {
                  'Content-Type' : "application/json"
              },
              body : JSON.stringify(data)
         }
         try{
          const response = await fetch(url,options)
          const data = await response.json()
          if(response.ok){
              const jwtToken = await data.jwt_token
              Cookies.set('jwt_token',jwtToken)
              Navigate('/')
          }
          else{
            setError(data.error)
          }
  
         }
         catch(err){

             console.log(err)
         }
    }

  return (
    <div className="login-cont">
        <div className='glass-effect'>
        <div className='chat-head-cont'>
                <TbMessageChatbotFilled className="chat-icon" />
                <h1>ChatApplication</h1>
                </div>
            <form className='form-cont' onSubmit={handleSubmit}>
            <label htmlFor="name">User Name</label>
                <div className='input-cont'>
                        
                        <input type="text" id="name" name="user-name" value={username} placeholder='Enter you name' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <label htmlFor="phone">Phone</label>
                <div className='input-cont'>
                        
                        <input type="tel" id='phone' name='phone' value={phone} placeholder="Enter your phone number" autoComplete="off" pattern="[0-9]{10}" required onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className='input-cont'>
                        
                        <input type="password" id="password" name="password" value={password} placeholder='Enter you password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                   
                    <button className='btn' type="submit">Register</button>
            </form>
                <div className='err-cont'>
                    {error && <p className='error-msg'>{error}</p>}
            </div>
            <div className='bottom-log-cont'>
                <p>our family 🫂? Please 👉<Link className="link-log" to='/login'>Login</Link></p>
            </div>
        </div>
    </div>
  )

}

export default Register