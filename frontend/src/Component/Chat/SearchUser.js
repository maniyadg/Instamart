import React, { useState } from 'react'
import { host } from '../../host';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

function SearchUser({chats , setChats , setCurrentChat , setLoadingChat}) {
  const {  token } = useSelector((state) => (state.authState))

  const [keyword, setKeyword] = useState()
  const [userData, setUserData] = useState()


  const handleClick = async (e) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${host}/api/get-users/${keyword}`, config)
      setUserData(data.user)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      // setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${host}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setCurrentChat(data);
      // setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div className='users'>
    <div className='chat-user-search'>
      <input type='search'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search' />
      <button onClick={handleClick}><span>Search</span></button>
      </div>

      <div className='chat-search-user-details'>
      {
        userData ?
          <ul >
            {
              userData?.map((e, index) => (
                <li
                  key={e._id}
                  className='person'
                  onClick={() => accessChat(e._id)}
                  
                >
                  <img alt='img' src={e?.avatar ?? "https://cdn-icons-png.flaticon.com/512/21/21104.png"} />
                  <p>{e?.username}</p>
                </li>
              ))
            }
          </ul> : null
      }
      </div>
      </div>
    )
    
}


export default SearchUser

