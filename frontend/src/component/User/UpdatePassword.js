import React, { Fragment, useRef, useState, useEffect } from 'react'
import Loader from '../layouts/Loader/Loader'
import './UpdatePassword.css'
import {Link} from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, updatePassword, loadUser } from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from "react-router-dom";
import MetaData from '../layouts/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../consants/userConsants'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';

function UpdatePassword() {
    const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [avatar, setAvatar] = useState(user.avatar);

  const updatePasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();

      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(updatePassword(myForm));
  }

  useEffect(() => {
      if(error) {
          alert.error(error);
          dispatch(clearErrors());
      }
      if(isUpdated) {
        alert.success("Profile Updated Successfully");
        history(`/account`);
        dispatch({type: UPDATE_PASSWORD_RESET});
      }
  }, [dispatch, error, alert, history, isUpdated]);



    return (
        <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
            <MetaData title = "Change Password" />
            <div className = "updatePasswordContainer">
                <div className = "updatePasswordBox">
                <h2 className = "updatePasswordHeading">Update Password</h2>
                <form 
                                className = "updatePasswordForm" 
                                encType='multipart/form-data'
                                onSubmit={updatePasswordSubmit}
                                >
                                <div className = "loginPassword">
                                    <VpnKeyIcon/>
                                    <input
                                        type = "password"
                                        placeholder='Old Password'
                                        required
                                        value = {oldPassword}
                                        onChange = {(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className = "loginPassword">
                                    <LockOpenIcon/>
                                    <input
                                        type = "password"
                                        placeholder='New Password'
                                        required
                                        value = {newPassword}
                                        onChange = {(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className = "loginPassword">
                                    <LockIcon/>
                                    <input
                                        type = "password"
                                        placeholder='Confirm Password'
                                        required
                                        value = {confirmPassword}
                                        onChange = {(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type = "submit"
                                    value = "updatePassword"
                                    className = "updatePasswordBtn"
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

export default UpdatePassword;
