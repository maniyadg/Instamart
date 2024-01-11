import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`http://localhost:4000/api/forgot-password` , email);
      if (data.message === "success") {
        navigate("/verify");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }


  return (
    <div className="sign-container">
      <div className="row">
        <div className="wrapper">
          <div
            className="form-container signup"
            style={{
              maxWidth: "26rem",
              paddingRight: "100px",
              marginTop: "150px",
            }}
          >
            <form
              action="#"
              encType="multipart/form-data"
              style={{ paddingLeft: "30rem" }}
              onSubmit={handleSubmit}
            >
              <h2 style={{ marginRight: "20rem", paddingLeft: "40px" ,position:"relative",left:"30px"}}>ForgetPassword</h2>

              <div className="form-group">
                <input
                  type={"email"}
                  name="email"
                  onChange={e => setEmail(e.target.value)} 
                  value={email}
                  required  />
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>

                <label for="">email</label>
              </div>

              <button className="btn" type="submit">
                Verify
              </button>

              <ToastContainer />

              <div className="login-link" style={{ paddingLeft: "130px", fontSize: "25px" }}>


                <Link to="/" className="signin-link">
                  Login
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
