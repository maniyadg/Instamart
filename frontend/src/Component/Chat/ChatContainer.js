import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { host } from '../../host';
import io from "socket.io-client";
import Picker from 'emoji-picker-react';
import animationData from '../../animations/typing.json'
import { toast } from 'react-toastify'
import Chatheader from './Chatheader';
import ChatMessage from './ChatMessage';
const ENDPOINT = "http://localhost:4000";
var socket, currentChatCompare;


function ChatContainer({ fetchAgain, setFetchAgain, currentChat, chatprofile }) {

  const {  user, token } = useSelector((state) => (state.authState))
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [notification, setNotification] = useState("");
  const [msg,setMsg] = useState('');
  const [showPicker,setShowPicker]= useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMsg(prevInput => prevInput+event.emoji);
    // setShowPicker(false);

  }

  const sendChat = (event) => {
    event.preventDefault();
    console.log(msg)

    if (msg.length > 0) {
        sendMessage(msg , setMsg);
        setMsg("");
    }
};


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !currentChatCompare || // if chat is not selected or doesn't match current chat
        currentChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });


  const fetchMessages = async () => {
    if (!currentChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      const { data } = await axios.get(
        `/api/message/${currentChat._id}`,
        config
      );
      setMessages(data);

      socket.emit("join chat", currentChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async () => {

    console.log(msg)
    if (msg) {
      socket.emit("stop typing", currentChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setMsg("");
        const { data } = await axios.post(
          `/api/message`,
          {
            content: msg,
            chatId: currentChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    currentChatCompare = currentChat;
    // eslint-disable-next-line
  }, [currentChat]);



  // const typingHandler = (e) => {
  //   // setMsg(e.target.value);

  //   if (!socketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.emit("typing", currentChat._id);
  //   }
  //   let lastTypingTime = new Date().getTime();
  //   var timerLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       socket.emit("stop typing", currentChat._id);
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // };



  console.log(currentChat)

  return (
    <>
      {currentChat === undefined ? (
        <div className="chat-display">
          <h2>Welcome</h2>
          <h1>Go Shop Application</h1>
        </div>) :
        (
          <>
          <div class="grid-item">            <Chatheader chatprofile={chatprofile} />
          </div>
          <div class="grid-item">
          <ChatMessage messages={messages} />
          </div>
          <div class="grid-item">
          <div className='chat-btn-container'>
          <div className='chat-form' >
          <img 
          className='emoji-icon'
          src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg'
          onClick={()=>setShowPicker((val)=>!val)} alt=''/>
          <form  onSubmit={(event) => sendChat(event)}>
          <input className='input-style'
          value={msg}
          onClick={()=>setShowPicker(false)}
          onChange={(e)=>setMsg(e.target.value)}
          />
          <button type="submit"><i class='bx bxs-send  msg-send-btn'></i></button>
          
          </form>
        <div className='emoji-box' >
          {showPicker && <Picker
                onEmojiClick={onEmojiClick}
            />}
            </div>
          </div>
          </div>   
          </div>  


       </>
        )
      }
    </>
  )
}

export default ChatContainer
