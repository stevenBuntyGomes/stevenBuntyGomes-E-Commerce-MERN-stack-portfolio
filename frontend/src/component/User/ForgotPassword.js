import React, { Fragment, useRef, useState, useEffect } from 'react'
import Loader from '../layouts/Loader/Loader'
import './ForgotPassword.css'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import MetaData from '../layouts/MetaData'

function ForgotPassword() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  // const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (message) {
        alert.success(message);
      }
    }, [dispatch, error, alert, message]);
  return (
      <Fragment>
        {loading ? <Loader/> : (
          <Fragment>
          <MetaData title = "Update Profile" />
            <div className = "forgotPasswordContainer">
              <div className = "forgotPasswordBox">
              <h2 className = "forgotPasswordHeading">Update Profile</h2>
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
        </Fragment>
        )}
      </Fragment>
  )
}

export default ForgotPassword;
 