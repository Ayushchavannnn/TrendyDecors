import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatButton from '../../components/ChatButton';

const Homepage = () => {
  const [value,setValue] = useState();
  const navigate = useNavigate();
  const handleJoinRoom = useCallback(()=>{
   navigate(`/room/${value}`)
  },[navigate,value])
  return (
    <div>
      <ChatButton/>
    <input value={value} onChange={(e)=>setValue(e.target.value)} type='text' placeholder='Enter room code'/>
    <button onClick={handleJoinRoom}>Join</button>
    </div>
  )
}

export default Homepage;