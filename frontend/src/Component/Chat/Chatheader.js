import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../../config/ChatLogics';
import { useSelector } from 'react-redux';

function Chatheader({chatprofile}) {
  console.log(chatprofile);
  return (
    <div className="chat-user-details">
            <div className="chat-user-avatar">
              <img
                className="chat-send-profile"
                src={chatprofile.avatar ?? 'https://cdn-icons-png.flaticon.com/512/21/21104.png'} alt=""
              />
            </div>
            <div className="chat-user-username">
              <h3>{chatprofile.username}</h3>
            </div>
    </div>
     )
}

export default Chatheader