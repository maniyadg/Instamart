import React from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logedout } from "../../actions/userActions";
import { useDispatch } from "react-redux";


export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(logedout)
    navigate('/')
  }
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <i class="bx bx-home-alt"></i>,
    },
    {
      path: "/category",
      name: "Category",
      icon: <i class="bx bx-category"></i>,
    },
    {
      path: "/cart",
      name: "Cart",
      icon: <i class="bx bx-cart-alt"></i>,
    },
    {
      path: "/orders",
      name: "Orders",
      icon: <i class="bx bx-shopping-bag"></i>,
    },
    {
      path: "/chat",
      name: "Chat",
      icon: <i class="bx bx-chat"></i>,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <i class="bx bx-user"></i>,
    },
    {
      path: "/create",
      name: "Create",
      icon: <i class="bx bx-message-square-add"></i>,
    }
  ];
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="top-section">
          <h1 className="logo">Go Shop</h1>
          
        </div>
        {
          menuItem.map((item,index)=>(
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
            <div className="icon">{item.icon}</div>
            <div className="link-text">{item.name}</div>
            </NavLink>
          ))
        }
        <div className="link" onClick={handleLogout} style={{cursor:"pointer"}}>
        <div className="icon"><i class="bx bx-log-out"></i></div>
        <div className="link-text">Logout</div>
        </div>
      </div>
    </div>
  );
}


{ /*
<li onClick={handleLogout}><span className='s-icons'><i class='bx bx-log-out'></i></span>logout</li> */}
