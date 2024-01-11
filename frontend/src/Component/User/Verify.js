import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import images from '../../images/logo.jpg'

export default function Verify() {
  const [show,setShow]=useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState()
  const [conPassword, setConPassword] = useState()

  const handleSubmit = async () => {
    try {
 const user = await axios.put(`http://localhost:4000/api/reset-password/${id}/${token}`, {password , conPassword});
 if (user.data.message=== "success") {
     alert("password changed Successfully");
     navigate("/");
   }
} catch (error) {
 alert(error.response.data.message);
}
}

  const handlePasswordShow = ()=>setShow(!show)
  return (
    <div className="sign-container">
    <div className="row">
      <div className="wrapper">
        <div className="form-container signin"  id='verify-container'>
          <form action="#" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center" >
          <figure className="avatar mr-3 item-rtl">
          <img
            src={images}
            alt="Avatar"
            style={{
              width: "130px",
              height: "130px",
              position: "relative",
              top: "20px",
              left: "7rem",
              border: "6px double #011d4a",
              cursor: "pointer",
              borderRadius: "50%",
            }}
          />
    
        </figure>
        

          </div>
          <div className="form-group" id='form-group' style={{marginTop:"30px"}}>
          <input
          type={show ? "text" :"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <label for="">password</label>
        </div>
        <div className="password-show-sign-in">
            <span><input type="checkbox" onClick={handlePasswordShow}/> Show password
            </span>
            </div>
            <div className="form-group" id='form-group'>
              <input
              type="password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              />
              <i>
                <FontAwesomeIcon icon={faLock} />
              </i>
              <label for="">Confirm Password</label>
            </div>
            
           
            <button type="submit" className="btn" style={{marginBottom:"40px"}}>
              Change
            </button>
           
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
