import React, { useEffect, useState } from "react";
import "./Product.css";
import Base from "../../Base/Base";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";
import Loader from "../../Base/Loader";
import Likes from "./Likes";
import Share from "./Share";
import axios from "axios";

export default function Product() {
  const navigate = useNavigate("");
  const location = useLocation();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.cartState);

  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState();

  useEffect(() => {
    getProd();
    getComment();
  }, []);

  const getProd = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/get-product/${location.state.p._id}`,
      config
    );
    console.log(data)
    setItems(data.product);
    setLoading(false);
  };
  console.log(items)

  const [img, setImg] = useState( location.state.p.images[0].image);



  const [quantity, setQuantity] = useState(1);

  const handleclick = (id, quantity) => {
    dispatch(addCartItem(id, quantity));
    if (error) {
      return toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    toast("Cart Item Added!", {
      type: "success",
      position: toast.POSITION.BOTTOM_CENTER,
    });
    dispatch(getCartItem())
  };

  const handleChangeImage = (im) => {
    setImg(im.image);
  };

  const handleNavigate = (p, quantity) => {
    navigate(`/address/${p._id}`, { state: { p, quantity } });
  };

  //Get Comment
  const getComment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/get-comment/${location.state.p._id}`,
        config
      );
      setComment(data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = () => {
    const count = document.querySelector('.count')
    if(location.state.p.stock ==0 ||  count.valueAsNumber >= location.state.p.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
}
const decreaseQty = () => {
    const count = document.querySelector('.count')
    if(count.valueAsNumber == 1 ) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
}

  return (
    <Base>
      {loading ? (
        <Loader />
      ) : (
        <div className="product-container">
          <div className="back-btn">
            <button onClick={() => navigate(-1)}>BACK</button>
          </div>
          <div className="row product-img-row">
            <div className="col-4 product-images" style={{ width: "30%" }}>
              <div className="product-img-box">
                <img
                  src={img}
                  onChange={(e) => setImg(e.target.value)}
                  alt="product"
                />
              </div>
            </div>
            <div className="col-4 product-buy" style={{ width: "50%" }}>
              <h4>{items.name}</h4>
              <h3>₹{items.price}</h3>
              <h5>In Stock :{items.stock} </h5>

              <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

              <input type="number" className="form-control count d-inline" value={quantity} readOnly />

              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>

              <div className="product-buy-btn">
                <button
                  className="product-add-btn"
                  style={{ background: "#bf00ff", color: "white" }}
                  disabled={items.stock == 0 ? true : false}
                  onClick={() => {
                    handleclick(items._id, quantity);
                  }}
                >
                  <i class="bx bx-cart"></i> Add to cart
                </button>
                <button
                  style={{ background: "#7fff84" }}
                  onClick={() => handleNavigate(items, quantity)}
                  className="product-b-btn"
                >
                  <i class="bx bxs-truck"></i> Buy Now
                </button>
              </div>
            </div>
            <div className="col-4 product-wishlist" style={{ width: "20%" }}>
              <Likes product={items} />
              <Share product={items} />
            </div>
          </div>
          <div className="row image-show">
            <div className="p-images" style={{marginLeft:"25px"}}
            >
              {items.images.map((im) => (
                <div
                  className="img-slide"
                  onClick={() => handleChangeImage(im)}
                >
                  <img alt="" src={im.image} />
                </div>
              ))}
            </div>
          </div>
          <div className="row product-decription-row">
            <div className="col-12 product-details" style={{ width: "100%" }}>
              <div className="product-detail-box">
                <h2>Product Details</h2>
                <hr />
                <ul>
                  <li>{items.description}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-4 product-reviews" style={{ width: "15%" }}>
            <div className="reviews-box">
              <h3>Reviews</h3>
              <hr />
              <ul>
                {comment &&
                  comment.map((c) => (
                    <div className="reviewer-box">
                      <div className="reviewer-info">
                        <img
                          src={
                            c.user.avatar ??
                            "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                          }
                          alt="img"
                        />
                        <h4 className="reviewer-name">{c.user.username}</h4>
                      </div>
                      <div className="review-content">
                        <li>{c.content}</li>
                        <h6>{c.createdAt.slice(0, 10)}</h6>
                        <h6>{c.createdAt.slice(11, 19)}</h6>
                        <span className="comment-like">
                          {" "}
                          <Likes product={items} />
                          <h6>8</h6>
                        </span>
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
}
