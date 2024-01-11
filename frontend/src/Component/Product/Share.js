import React, { useState } from 'react'
import axios from 'axios';

export default function Share({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [content, setContent] = useState()
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCommentOpen = () => {
    setIsOpenComment(!isOpenComment)
  }

  const handleSubmit = async () => {
    try {
      const postId = product._id
      const postUserId = product.user._id
      const user = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post(`http://localhost:4000/api/create-comment`, { content, postId, postUserId }, config
      )
      console.log(data)
      setIsOpenComment(false)
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <>
      <div className="product-icons">
        <i class="bx bx-share" onClick={handleOpen}></i>
        <section
          className="share-open-box"
          style={{ display: isOpen && !isOpenComment ? "block" : "none" }}
        >
          <ul>
            <li>
              <i class="bx bxl-whatsapp" style={{ color: "green" }}></i>
            </li>

            <li>
              <i class="bx bxl-facebook" style={{ color: "blue" }}></i>
            </li>

            <li>
              <i class="bx bxl-instagram" style={{ color: "#860466" }}></i>
            </li>
          </ul>
        </section>
      </div>
      <div className="product-icons">
        <i class="bx bx-message-rounded" onClick={handleCommentOpen}></i>
        <div className="comment-box" style={{ display: isOpenComment ? "block" : "none" }}
           >
          <textarea onChange={e => setContent(e.target.value)}
            placeholder='Enter your Address...'
            value={content}></textarea>
          <button onClick={handleSubmit}>send</button>
        </div>
      </div>

    </>
  )
}
