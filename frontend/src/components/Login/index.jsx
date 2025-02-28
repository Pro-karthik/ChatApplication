import {useState,useEffect} from 'react'
import {Link, useNavigate,} from 'react-router-dom'
import Cookies from 'js-cookie'

import { TbMessageChatbotFilled } from "react-icons/tb"


import './index.css'

const Login = () => {
  const Navigate = useNavigate()
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [phone,setPhone] = useState('')

  useEffect(() => {
      const jwtToken = Cookies.get('jwt_token')
      if(jwtToken){
          Navigate('/')
      }
    })

  const handleSubmit = async (event) => {
       event.preventDefault()
       const data = {phone,password}
       const url = 'http://localhost:5000/api/auth/login'
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
        setError('Something went wrong')
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
                        <label htmlFor="phone">Phone</label>
                        <div className='input-cont'>
                        <input type="tel" id='phone' name='phone' value={phone} placeholder="Enter your phone number" autoComplete="off" pattern="[0-9]{10}" required onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        
                        <label htmlFor="password">Password</label>
                        <div className='input-cont'>
                        <input type="password" id="password" name="password" placeholder='Enter you password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                   
                    <button className='btn' type="submit">Login</button>
                </form>
                <div className='err-cont'>
                    {error && <p className='error-msg'>*{error}</p>}
            </div>
            <div className='bottom-log-cont'>
                <p>Not joined our family 😤?👉<Link className="link-log" to='/register'>Register</Link></p>
            </div>
        </div>
    </div>
  )

}

export default Login