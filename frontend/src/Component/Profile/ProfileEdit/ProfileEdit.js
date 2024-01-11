import React, { useEffect, useRef, useState } from "react";
import "./ProfileEdit.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { host } from "../../../host";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdateProfile } from "../../../slices/authSlice";
import { clearAuthError, updateProfile } from "../../../actions/userActions";

export default function ProfileEdit({
  user,
  setIsOpenEditProfile,
  isOpenEditProfile,
}) {

  const handleOpenProfileEdit = () => setIsOpenEditProfile(!isOpenEditProfile);
  const inputRef = useRef(null)
  const { error, isUpdated } = useSelector(state => state.authState);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://cdn-icons-png.flaticon.com/512/21/21104.png");
  const dispatch = useDispatch();

  const handleImageClick = ()=>{
    inputRef.current.click()
  }

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0])
      }
    }


    reader.readAsDataURL(e.target.files[0])
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username)
    formData.append('email', email)
    formData.append('phone', phone);
    formData.append('avatar', avatar);
    dispatch(updateProfile(formData))
  }

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar)
      }
    }

    if (isUpdated) {
      toast('Profile updated successfully', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUpdateProfile())
      })
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearAuthError) }
      })
      return
    }
  }, [user, isUpdated, error, dispatch])
  return (
    <div className="profile-details-edit">
      <form onSubmit={submitHandler} >
        <div className="profile-detail-edit-img">
          <figure className="avatar mr-3 item-rtl" onClick={handleImageClick}>
            <img
              src={avatarPreview}
              alt="Avatar"
              className=""
              style={{
                position: "relative",
                top: "20px",
                left: "6rem",
                border: "2px solid black",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
            <span><i class='bx bx-image-add' id="bx-image-add"></i></span>

          </figure>

          <div className="custom-file">
            <input
              type="file"
              name="avatar"
              onChange={onChangeAvatar}
              accept="image/*"
              className="custom-file-input"
              id="customFile"
              style={{ display: "none" }}
              ref={inputRef}
            />

          </div>
        </div>
        <div className="profile-edited-details">
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
            required />
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="email" required />
          <input type="number" name="phone" onChange={e => setPhone(e.target.value)} placeholder="Contact" />
          <textarea placeholder="edit your bio"></textarea>
        </div>
        <div className="profile-details-edit">
          <button onClick={handleOpenProfileEdit}>Cancel</button>
          <button type="Submit">Update</button>
        </div>
      </form>

    </div>
  );
}
