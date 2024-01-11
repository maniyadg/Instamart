import React from "react";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import SignIn from "../Component/User/SignIn";
import { useNavigate } from "react-router-dom";

export default function Base({ children }) {
  const {isAuthenticated} = useSelector(state=>state.authState)
  const navigate = useNavigate();
  return (
    <>
    {
      isAuthenticated ? <div className="base-design">
      <Sidebar />
        <div className="whole-content">
        
        <Topbar />
        <div className="content">{children}</div>
        <div className="mobile-nav">
     <ul>
     <li onClick={()=>navigate("/home")}><i class="bx bx-home-alt"></i></li>
     <li onClick={()=>navigate("/chat")}><i class="bx bx-chat"></i></li>
     <li onClick={()=>navigate("/create")}><i class="bx bx-message-square-add"></i></li>
     <li onClick={()=>navigate("/profile")}><i class="bx bx-user"></i></li>
    
     <li onClick={()=>navigate("/orders")}><i class="bx bx-shopping-bag"></i></li>
    
     </ul>
        </div>
        </div>
       
      </div> : <SignIn/>
    }
    </>
  );
}
