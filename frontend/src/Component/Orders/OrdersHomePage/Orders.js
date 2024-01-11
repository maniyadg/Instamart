import React, { useEffect, useState } from "react";
import Base from "../../../Base/Base";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { host } from "../../../host";
import axios from "axios";

export default function Orders() {
  const navigate = useNavigate("");

  const [orderData, setOrderData] = useState();
  const [deliverDate,setDeliverDate]=useState();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${host}/api/my-orders`, config);

      setOrderData(data.orders);
      var someDate = new Date(data.orders[0].createdAt);
      var numberOfDaysToAdd = 3;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      var deliveryDate = new Date(result).toISOString().slice(0,10);
      setDeliverDate(deliveryDate)
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocate = async (p) => {
    navigate(`/locate-order`,{ state: { p } });
  };
  return (
    <Base>
      <div className="orders-container">
        <div className="back-btn">
          <button onClick={() => navigate(-1)}>BACK</button>
        </div>
        <div className="search-orders">
        <input type="text" placeholder="Search For..." />
        <button className="order-search-btn">SEARCH</button>
      </div>
        {orderData &&
          orderData.map((p) => (
            <>
              
              {p.orderItems.map((i) => (
                <div className="my-orders" onClick={()=>handleLocate(p)}>
                  <div className="order-product-img">
                    <img alt="image" src={i.product.images[0].image} />
                  </div>
                  <div className="order-product-detail">
                    <div className="row">
                      <div className="col" style={{ marginLeft: "20px" }}>
                      <div className="order-pro-name">
                      <h5>{i.product.name}</h5>
                      </div>
                       
                        {p.payment ? (
                          <p className="order-success">payment success</p>
                        ) : (
                          <p className="order-cod">Cash on delivery</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="order-product-price">
                    <h5>₹{i.product.price}</h5>
                  </div>
                  <div className="order-dispatch-detail">
                    <h5>
                      Delivered on {deliverDate}
                    </h5>
                  </div>
                </div>
              ))}
            </>
          ))}
      </div>
    </Base>
  );
}
