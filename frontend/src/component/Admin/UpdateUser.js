import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {Button} from '@mui/material'
import MetaData from '../layouts/MetaData'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Sidebar from "./Sidebar";
import Loader from '../layouts/Loader/Loader'
import {
    getUserDetails,
    updateUser,
    clearErrors,
} from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../consants/userConsants'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"

function UpdateUser() {
    const history = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
      } = useSelector((state) => state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;
    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            history("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
        
    }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        dispatch(updateUser(userId, myForm));
      };
  return (
    <Fragment>
        <MetaData title="Update User" />
        <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
            {loading ? (
            <Loader />
            ) : (
            <form
                className="createProductForm"
                onSubmit={updateUserSubmitHandler}
            >
                <h1>Update User</h1>

                <div>
                <PersonIcon />
                <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div>
                <MailOutlineIcon />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Choose Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                </div>

                <Button
                id="createProductBtn"
                type="submit"
                disabled={
                    updateLoading ? true : false || role === "" ? true : false
                }
                >
                Update
                </Button>
            </form>
            )}
        </div>
        </div>
    </Fragment>
  )
}

export default UpdateUser