import React , {useEffect, useRef, useState} from 'react'
import Base from '../../Base/Base'
import './Profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProfileEdit from './ProfileEdit/ProfileEdit'

export default function Profile() {

  const { isAuthenticated,user} = useSelector((state)=>(state.authState))
  const { products, loading } = useSelector((state) => state.productsState);
  const [isOpenEditProfile,setIsOpenEditProfile]=useState(true);
  const [openPost,setOpenPost]=useState(false);


  const handleOpenProfileEdit =()=>setIsOpenEditProfile(!isOpenEditProfile);

  

  const [posts , setPosts] = useState(0);
  const [data,setData]=useState();
  const inputRef = useRef(null)
  const [avatarPreview, setAvatarPreview] = useState("https://cdn-icons-png.flaticon.com/512/21/21104.png");


  const handleImageClick = ()=>{
    inputRef.current.click()
  }
  const navigate = useNavigate();
  useEffect(() => {
    myposts()
  }, []);
  
 const myposts = async() => {
  
  const user = JSON.parse(localStorage.getItem('userInfo'));
  console.log(user);
  const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
  const {data} = await axios.get('/api/myposts' , config)
  if(data){
    setPosts(data.products.length)
    setData(data.products)
  }
 }


 
const handleProductPage = (p) => {
  console.log(p.name);
  navigate(`/product/${p._id}`, { state: { p } });
};
  return (
    <Base>
    {
      isAuthenticated ?     <div className='profile-container' >
      
      <div className="profile-edit" >
      <i class='bx bxs-edit' style={{display:isOpenEditProfile ? "block" : "none"}} onClick={handleOpenProfileEdit}></i>
      </div>
      <div className='profile-edit-page' style={{display:isOpenEditProfile ? "none" : "block"}}>
      <ProfileEdit setIsOpenEditProfile={setIsOpenEditProfile} isOpenEditProfile={isOpenEditProfile}/>
      </div>
      <div  style={{display:isOpenEditProfile ? "block" : "none"}}>
      <div className='profile-user-detail' style={{display:"flex"}}>
      <div className='profile-page-pic'>
      <figure className="avatar mr-3 item-rtl" onClick={handleImageClick}>
      <img
        src={user.avatar ?? avatarPreview}
        alt="Avatar"
        className='profile-page-img'
        
      />

    </figure>

    <div className="custom-file">
      <input
        type="file"
        name="avatar"
        onChange={""}
        accept="image/*"
        className="custom-file-input"
        id="customFile"
        style={{ display: "none" }}
        ref={inputRef}
      />

    </div>
      </div>
      <div className='profile-details' >
      <h3>{user.username}</h3>
     <p>{user.email}</p>
      <p>Innocent boy😁</p>
      </div>
      </div>
      
      </div>
      
      <div className='profile-post' >
      <ul className='post-detail-box' style={{display:isOpenEditProfile ? "block" : "none"}}>
      <li className='p-list p-content'><span className='p-values'>{posts}</span><br/>Post</li>
      <li className='p-list p-content'><span className='p-values'>{user.followers.length}</span><br/>Followers</li>
      <li className='p-list p-content'><span className='p-values'>{user.following.length}</span><br/>Following</li>
      </ul>
      </div>
      
      <div className='profile-post-box' style={{display:isOpenEditProfile ? "block" : "none"}}>
      <div style={{display:"flex",flexWrap:"wrap"}}>
      {
        data && data.map((p)=>(
        <div className='post-card'>
        
        
        <div className='post-img'>
        <img src={p.images[0].image} alt='img' onClick={()=>handleProductPage(p)}/>
        </div>
        <div className='post-name'>
        <h4 onClick={()=>handleProductPage(p)}>{p.name}</h4>
        </div>
        <div className='post-edit-btn'>
        <span style={{padding:"0px"}}>  <i class="fa fa-heart" id="p-like" style={{color:"red"}}></i> <span id="p-no">{p.likes.length}</span></span>
        <i class='bx bx-edit-alt' onClick={()=>navigate("/postedit")}></i>
        <i class='bx bx-trash-alt'></i>
        </div>
        </div>
        
        ))
        
      }
      </div>
     
      </div>
      
      
      </div>
      
      : <></>
    }

    </Base>
  )
}
