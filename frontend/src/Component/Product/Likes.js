import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Likes({product}) {
  const { user } = useSelector((state) => (state.authState))

    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);


// handle Like
    const handleLike = async (id) => {
        if (loadLike)
            return;

        setLoadLike(true);
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.put(`http://localhost:4000/api/like/${id}`, config)
        console.log(data)
        setLoadLike(false);
        setIsLike(true)

    }

// handle UnLike
    const handleUnLike = async (id) => {
        if (loadLike)
            return;

        setLoadLike(true);
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        };
        const { data } = await axios.put(`http://localhost:4000/api/unLike/${id}`, config)
        console.log(data)
        setLoadLike(false);
        setIsLike(false)
    }

    useEffect(() => {
        if (product.likes.some(id => id === user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    }, [product, user._id])

    return (
        <div className="product-icons">
            {
                isLike ? <i className="bx bxs-heart" id='review-like'
                    onClick={() => handleUnLike(product._id)}
                    style={{ color: "red" }}

                ></i> : <i className="bx bx-heart" id='review-like'
                    onClick={() => handleLike(product._id)}
                    style={{ color: "" }}
                ></i>
            }
        </div>
    )
}
