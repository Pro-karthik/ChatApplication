import {useState,useContext} from 'react'
import Cookies from 'js-cookie'

import ChatContext from '../../context/ChatContext';

import './index.css';

const AddFriends =  () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const {fetchChatList} = useContext(ChatContext);
 
  const HandleSubmit = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get('jwt_token')
    const data = {
      name,
      phone : number
    }
    const url = 'http://localhost:5000/api/user/addFriends'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
    }
    ,
      body: JSON.stringify(data)
  }
    try{
          const response = await fetch(url, options);
          const data = await response.json()
          if(response.ok === true){
            setName('')
            setNumber('')
            setError('')
            setError(data.message)
            fetchChatList()
          }
          else{
            setError(data.message)
          }
    }
    catch(error){
      setError(error.message)
    }
  }

  return (
    <div className='add-friends-container'>
        <h1>Add Friends</h1>
         <img className="add-frnd-img" src='https://res.cloudinary.com/djauqmosx/image/upload/v1739085225/chat-app-add-frnd_hfnyeb.png'/>
         <div className='add-frnd-form-container'>
        <form className='add-friends-form' onSubmit={HandleSubmit}>
          <label>Name</label>
          <input type='text' value={name} placeholder='Enter your friend name' onChange={(e) => (setName(e.target.value))} />
          <label>Number</label>
          <input type='tel' value={number} placeholder='Enter your friend number' onChange={(e) => (setNumber(e.target.value))}/>
          <button type='submit'>Add Friend</button>
        </form>
        
        </div>
        {error && <p className='actual-msg'>{error}</p>}
    </div>
  )
}

export default AddFriends;