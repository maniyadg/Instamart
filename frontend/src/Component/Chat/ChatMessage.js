import React, { useRef } from 'react'
import { v4 as uuidv4 } from "uuid";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics'
import { useSelector } from 'react-redux';

function ChatMessage({messages}) {
    const {  user } = useSelector((state) => (state.authState))
    const scrollRef = useRef();

  return (
    <div className="chat-messages" >
    {

      messages.map((m, i) => (
        <div ref={scrollRef} key={uuidv4()}>
          <div className="message">
            <div className={m.sender._id === user._id ? "sender" : "reciver"}>
            
              <div className={m.sender._id === user._id ? "sender-msg" : "reciver-msg"} style={{
                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                // marginLeft: isSameSenderMargin(messages, m, i, user._id),
                // marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                            }}>{m.content}</div>
            </div>
          </div>
        </div>
      ))}
  </div>  )
}

export default ChatMessage