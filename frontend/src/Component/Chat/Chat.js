import React, { useState, useEffect, useRef } from 'react'
import Base from '../../Base/Base'
import './Chat.css'
import ChatContainer from './ChatContainer'

import { useSelector } from 'react-redux';
import SearchUser from './SearchUser';
import ListUsers from './ListUsers';


function Chat() {
  const { isAuthenticated, user, token } = useSelector((state) => (state.authState))
  const [chats, setChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [fetchAgain, setFetchAgain] = useState(false);
  const[isOpenSearch,setIsOpenSearch]=useState(false);
  const [chatprofile, setChatprofile] = useState("");



const toggle = ()=>setIsOpenSearch(!isOpenSearch);




  console.log(user)




  return (
    <Base>
      {
        isAuthenticated ?
          <div className='chat-container'>
          
            <div className="chat-person-list" style={{ width: "35%" }}>
            <div className='chat-profile'>
            <div className='db'>
 
          <img src={user.avatar ?? "https://cdn-icons-png.flaticon.com/512/21/21104.png"} alt='db'/>
                </div>
            <div className='chat-user-name'>
           <h3>{user.username}</h3>
          </div>
          <div className='chat-user-search-icon'  onClick={toggle} style={{display:!isOpenSearch?"block":"none"}}>
          
          <i class='bx bx-search'></i>

          
          </div>
            </div>
    <div style={{display:!isOpenSearch?"none":"block"}}>
    <SearchUser chats={chats} setChats={setChats} setCurrentChat={setCurrentChat} />

    </div>

 
    <div className='chat-user-list'>
    <ListUsers chats={chats} setChats={setChats} setCurrentChat={setCurrentChat} fetchAgain={fetchAgain} setChatprofile={setChatprofile} />

    </div>

            </div>
            <div className='grid-container' >
              <ChatContainer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} currentChat={currentChat} chatprofile={chatprofile} />
            </div>


          </div> : null
      }






    </Base>)
}

export default Chat