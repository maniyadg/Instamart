import React from "react";
import Base from "../../../Base/Base";
import "./Category.css";
import useCategory from "../../Hooks/useCategory";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const categories = useCategory();
  const navigate = useNavigate("");

 const handleNavigate = (categories)=>{
  console.log(categories)
  if(categories.name){
    navigate(`/category/${categories.name}`)
  }
 }  

  return (
    <Base>
    <div id="back-btn" >
    <button  onClick={()=>navigate(-1)}>BACK</button>

    </div>
    <div className="cat-container">
    
      {categories.map((categories) => (
        <div className="category-container">
        
          <div className="c-container" onClick={() => handleNavigate(categories)}>
            <img src={categories.photo} alt="Electronics"  />
            <h4 className="cat-name">{categories.name}</h4>
            <h4 className="c-offer">Min. 50% Off</h4>
          </div>
        </div>
      ))}
      </div>
    </Base>
  );
}
