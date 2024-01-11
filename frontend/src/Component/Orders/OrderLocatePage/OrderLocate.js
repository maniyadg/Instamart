import React from "react";
import "./OrderLocate.css";
import Base from "../../../Base/Base";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderLocate() {
  const navigate = useNavigate("");
  const location = useLocation();
  console.log(location.state.p.orderItems[0].product.price);
  return (
    <Base>
      <div className="locate-order-container">
        <div className="back-btn">
          <button onClick={() => navigate(-1)}>BACK</button>
        </div>
        <div className="user-detail">
          <div className="user-address">
            <h3>
              <b>Shipping Address</b>
            </h3>
            <h4>{location.state.p.user.username}</h4>
            <h6>Address:{location.state.p.shippingInfo.address}</h6>
          </div>
          <div className="payment-detail">
            <h3>
              <b>Payment Method</b>
            </h3>
            <h5>{location.state.p.payment ? "Online Payment" : "Cash On Delivery"}</h5>
          </div>
          <div className="order-summery-class">
            <h3>
              <b>Order Summery</b>
            </h3>
            <h6>
              <span>
                item price: <span>₹{location.state.p.orderItems[0].product.price}</span>
              </span>
            </h6>
            <h6>
              <span>
                conveniant fee: <strike>₹70</strike>
              </span>
            </h6>
            <h6>
              <span>
                Delivery fee: <strike>₹40</strike>
              </span>
            </h6>
            <h5>
              <b>
                <span>
                  Grant total: <span>₹{location.state.p.shippingInfo.totalPrice}</span>
                </span>
              </b>
            </h5>
          </div>
        </div>
        
        <div className="product-detail">
        
          <div className="product-image">
            <img
              alt="img"
              src={location.state.p.orderItems[0].product.images[0].image}
            />
          </div>
          <div className="product-info">
            <h5>{location.state.p.orderItems[0].product.name}</h5>
            <h4>₹{location.state.p.orderItems[0].product.price}</h4>
            <button className="reorder-btn"><i class='bx bx-repeat'></i>Buy it again</button>
          </div>
           </div>
      </div>
    </Base>
  );
}
