import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./Home.css";



export default function FollowData( { _id , followers } ) {
    const {  user  } = useSelector((state) => (state.authState))
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        if(followers?.some((id) => id === user._id)){
            setFollow(true)
        }
        return () => setFollow(false);
    },[])

    const handleFollow = async(id) => {
        setFollow('follow')
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data} = await axios.put(`/api/follow/${id}` , config)
        console.log(data)
    
      }
      const handleUnFollow = async(id) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data} = await axios.put(`/api/unfollow/${id}` , config)
        console.log(data)
        setFollow(!follow);
      }
    return (
    <>
    {
        follow ? (
            <button onClick={()=>handleUnFollow(_id)} className="button">Unfollow</button>
        ) : (
            <button onClick={()=>handleFollow(_id)} className='button'>follow</button>
        )
    }
    </>
  )
}


