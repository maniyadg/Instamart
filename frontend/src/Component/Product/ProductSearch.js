import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../actions/productsActions';
import Base from '../../Base/Base';
import { addCartItem } from '../../actions/cartActions';
import { toast } from 'react-toastify';
import { Rating, Typography } from '@mui/material';
import Loader from '../../Base/Loader';
import FollowData from '../Home/FollowData';

const ProductSearch = () => {
    const navigate = useNavigate("");
    const dispatch = useDispatch()
    const { products, loading } = useSelector((state) => state.productsState);





    const { error} = useSelector(state => state.cartState)
  
  
  

    const {keyword} = useParams()


    useEffect(()=>{
      
        dispatch(getProducts(keyword)) 
        console.log(products);
    }, [keyword])
 
   
    const handleProductPage =  (p) => {
      
      navigate(`/product/${p._id}`,{state:{p}});
    };

  return (
    <Base>
    <div id="search-back-btn">
          <button onClick={() => navigate(-1)}>BACK</button>
        </div>
    {loading ? (
      <Loader />
    ) : (
      
      <div className="container">
      
        {products &&
          products.map((product) => (
            <div className="card" >
              <div className="profile-card">
                <div className="user-info">
                  <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&usqp=CAU"
                  alt="img"
                  />  
                  <h1 className="name">{product.user.username}</h1>
                </div>
                
                <FollowData _id={product.user._id} followers={product.user.followers} />
                </div>
              <hr style={{ margin: "0px 5px" }} />

              <div className="product" onClick={()=>handleProductPage(product)}>
                <img
                  src={product.images[0].image}
                  alt=""
                />
                <div>
                  <h1 className="pro-name">{product.name}</h1>
                  
                  <hr style={{ width: "19vw" }} />
                  <h1 className="price">₹{product.price}</h1>
                  <span style={{padding:"20px"}}><i class="fa fa-heart" style={{color:"red"}}></i>  <span>{product.likes.length}</span></span>

                </div>
              </div>
            </div>
          ))}
      </div>
    )}
   
    </Base>
  )
}

export default ProductSearch
