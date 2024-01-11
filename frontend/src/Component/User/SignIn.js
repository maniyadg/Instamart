import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, login } from "../../actions/userActions";
import {toast} from 'react-toastify'
import images from '../../images/logo.jpg'

export default function SignIn() {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [show,setShow]=useState(false);


    const handlePasswordShow = ()=>setShow(!show)
    const { loading, error, isAuthenticated ,user , token } = useSelector(state => state.authState)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
      if(isAuthenticated) {
        navigate('/home')
    }
    if(error)  {
      toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          onOpen: ()=> { dispatch(clearAuthError) }
      })
      return
  }
},[error, isAuthenticated, dispatch, navigate])

  return (
    <div className="sign-container">
      <div className="row">
        <div className="wrapper">
          <div className="form-container signin">
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
              <div className="form-group">
                <input
                  type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>

                <label for="">email</label>
              </div>
              <div className="form-group">
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
              <div className="forgot-pass">
                {" "}
                <Link to="/forget" className="forgot-link">
                  Forgot Password
                </Link>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <div className="login-link">
                <p>
                  Don't have an account?
                  <Link to="/signup" className="signin-link">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
