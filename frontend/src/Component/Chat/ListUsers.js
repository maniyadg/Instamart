import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { host } from '../../host';
import { toast } from 'react-toastify';
import { getSender, getSenderFull, getSenderProfile } from '../../config/ChatLogics';

function ListUsers({chats , setChats, setCurrentChat , fetchAgain , setChatprofile}) {
  const { isAuthenticated, user, token } = useSelector((state) => (state.authState))

  const [loggedUser, setLoggedUser] = useState()
  const [cntProfile , setCntProfile] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };






  const handleClick = (chat , user) =>{
      if(chat){
        setCurrentChat(chat)
        getSender(user, chat.users)
        const userDetails = getSenderFull(user, chat.users)
        setChatprofile(userDetails)
      }
    }
  


  return (
    <div className='chat-users-list'>
      {
        chats ?
          <ul>
            {
              chats.map((chat) => (
                <li
                key={chat._id}
                className='chatName'
                onClick={()=>handleClick(chat , user)}>

                {
                  !chat.isGroupChat ? <img  className="list-user-img" src={ getSenderProfile(loggedUser, chat.users)} /> : <img src = "https://cdn-icons-png.flaticon.com/512/21/21104.png" />
                  
                }
                
                  
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </li>
              ))
            }
          </ul> : null
      }
    </div>
  )
}

export default ListUsers
