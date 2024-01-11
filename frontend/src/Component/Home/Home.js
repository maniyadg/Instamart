import React, { useEffect, useState } from "react";
import Base from "../../Base/Base";
import "./Home.css";
import useCategory from "../Hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Base/Loader";
import { getProducts } from "../../actions/productsActions";
import FollowData from "./FollowData";

export default function Home() {
  const { isAuthenticated, user, token } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsState);
 


  useEffect(() => {
    dispatch(getProducts(null));
  }, [dispatch]);
  const categories = useCategory();
  const navigate = useNavigate("");

  const handleCategoryNavigate = (categories) => {
    if (categories.name) {
      navigate(`/category/${categories.name}`);
    }
  };

  //get cat

  const handleProductPage = (p) => {
    console.log(p.name);
    navigate(`/product/${p._id}`, { state: { p } });
  };

  return (
    <>
      {isAuthenticated ? (
        <Base>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row">
                <div className="col reel-type-category">
                  {categories.map((categories) => (
                    <div
                      className="category-reel"
                      onClick={() => handleCategoryNavigate(categories)}
                    >
                      <img src={categories.photo} alt="photo" />
                      <p style={{ fontWeight: "550" }}>{categories.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {products &&
                products.map((p, i) => (
                  <div className="card">
                    <div className="profile-card">
                      <div className="user-info">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&usqp=CAU"
                          alt="img"
                        />
                        <h1 className="name">{p.user.username}</h1>
                      </div>

                      <FollowData _id={p.user._id} followers={p.user.followers} />

                    </div>

                    <hr
                      style={{ margin: "0px 5px" }}
                      className="profile-divider"
                    />

                    <div className="product">
                      <img src={p.images[0].image} alt="" onClick={() => handleProductPage(p)}/>
                      <div>
                        <h1 className="pro-name" onClick={() => handleProductPage(p)}>{p.name}</h1>
                       
                        <hr className="product-divider" />
                        
                        <h1 className="price" onClick={() => handleProductPage(p)}>₹{p.price}</h1>
                        <span style={{padding:"20px"}}>  <i class="fa fa-heart" style={{color:"red"}}></i> <span className="like-no">{p.likes.length}</span></span>

                      </div>
                    </div>
                  
                  </div>
                ))}
            </div>
          )}
        </Base>
      ) : (
        navigate("/")
      )}
    </>
  );
}
