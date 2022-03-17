import React, { Fragment, useRef, useState, useEffect } from 'react'
import Loader from '../layouts/Loader/Loader'
import './UpdateProfile.css'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, updateProfile, loadUser } from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from "react-router-dom";
import MetaData from '../layouts/MetaData'

function UpdateProfile() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState(user.avatar);

  const updateProfileSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm));
  }

  const updateProfileDataChange = (e) => {
          const reader = new FileReader();
          reader.onload = () => {
              if(reader.readyState === 2){
                  setAvatarPreview(reader.result);
                  setAvatar(reader.result);
              }
          }

          reader.readAsDataURL(e.target.files[0]);

      
  }

  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
      setAvatarPreview(user.avatar.url);
    }
      if(error) {
          alert.error(error);
          dispatch(clearErrors());
      }
      if(isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
        history(`/account`);
      }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
      <Fragment>
        {loading ? <Loader/> : (
          <Fragment>
          <MetaData title = "Update Profile" />
            <div className = "updateProfileContainer">
              <div className = "updateProfileBox">
                <h2 className = "updateProfileHeading">Update Profile</h2>
              <form 
                              className = "updateProfileForm" 
                              encType='multipart/form-data'
                              onSubmit={updateProfileSubmit}
                              >
                              <div className = "supdateProfileName">
                                  <FaceIcon/>
                                  <input
                                      type = "text"
                                      placeholder = "Name"
                                      required
                                      name = "name"
                                      value = {name}
                                      onChange={(e) => setName(e.target.value)}
                                  />
                              </div>
                              <div className = "updateProfileEmail">
                                  <MailOutlineIcon/>
                                  <input
                                      type = "email"
                                      placeholder = "Email"
                                      required
                                      name = "email"
                                      value = {email}
                                      onChange={(e) => setName(e.target.value)}
                                  />
                              </div>
                              <div className = "updateProfileImage">
                                  <img src = {avatarPreview} alt = "avatar preview"/>
                                  <input
                                      type="file"
                                      name="avatar"
                                      accept="image/*"
                                      onChange={updateProfileDataChange}
                                  />
                              </div>
                              <input
                                  type = "submit"
                                  value = "updateProfile"
                                  className = "updateProfileBtn"
                                  disabled = {loading ? true : false}
                              />
      
                          </form>
              </div>
            </div>
        </Fragment>
        )}
      </Fragment>
  )
}

export default UpdateProfile;
