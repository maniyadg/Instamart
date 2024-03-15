import React, { useEffect, useState } from 'react'
import Base from '../../../Base/Base'
import './CategoryType.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FollowData from '../../Home/FollowData';



export default function CategoryType() {
 const params = useParams();
 const [category,setCategory] = useState();
 const [product,setProduct] = useState([]);

 const navigate = useNavigate("");

useEffect(()=>{
 if(params.name ){
  getProduct()
 }
},[params.name])

 const getProduct = async()=>{
  const data = await axios.get(`/api/product-category/${params.name}`)
  if(data){
    console.log(data)
    setCategory(data.data.category)
    setProduct(data.data.products)
  }

 }
  


 const handleProductPage = (p) => {
  console.log(p.name);
  navigate(`/product/${p._id}`, { state: { p } });
};

  return (
    <Base>
    <div className='category-type-container'>
    <div className="back-btn">
    <button  onClick={()=>navigate(-1)}>BACK</button>

    </div>
    <h4 className='type-name'>{category?.name}</h4>
    <div className='row type-row'>
   
    
    {
      
      product.map((p) => (
        <div className="card">
                    <div className="profile-card">
                      <div className="user-info">
                        <img
                          src={p.user.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&usqp=CAU"}
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
                        <span style={{padding:"20px"}}>  <i class="fa fa-heart" style={{color:"red"}}></i> <span>{p.likes.length}</span></span>

                      </div>
                    </div>
                  
                  </div>
      ))
      
    }

  
    </div>
    </div>
    
    </Base>
  )
}
