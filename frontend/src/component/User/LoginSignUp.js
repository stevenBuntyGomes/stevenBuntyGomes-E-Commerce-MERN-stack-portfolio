import React, { Fragment, useRef, useState, useEffect } from 'react'
import Loader from '../layouts/Loader/Loader'
import './LoginSignUp.css'
import {Link} from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from '../../actions/userAction'
import {useAlert} from 'react-alert'
import { useNavigate } from "react-router-dom";

function LoginSignup() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const { error, loading, isAuthenticated, success: userResisterSuccess } = useSelector((state) => state.user);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    

    const {name, email, password} = user;


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const logInWithAdminHandler = (e) => {
        e.preventDefault();
        dispatch(login("stevengomes@gmail.com", "12345678"));
    }
    const logInWithAdminHandler2 = (e) => {
        e.preventDefault();
        dispatch(login("testnextjs@gmail.com", "12345678"));
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);

        }else{
            setUser({...user, [e.target.name]: e.target.value});
        }
    }
    const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(userResisterSuccess){
            alert.success("user has been registered successfully. Now Log In");
        }
        if(isAuthenticated) {
            history(redirect);
        }
    }, [dispatch, error, alert, history, isAuthenticated, userResisterSuccess]);

    const switchTabs = (e, tab) => {
        if(tab === "Login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === "Register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }
    }


    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                <div className = "LoginSignUpContainer">
                    <div className = "LoginSignUpBox">
                        <div>
                            <div className = "login_signUp_toggle">
                                <p onClick = {(e) => switchTabs(e, "Login")}>LOGIN</p>
                                <p onClick = {(e) => switchTabs(e, "Register")}>REGISTER</p>
                            </div>
                            <button ref = {switcherTab}></button>
                        </div>
                        <form className = "loginForm" ref = {loginTab} onSubmit={loginSubmit}>
                            <div className = "loginEmail">
                                <MailOutlineIcon/>
                                <input
                                    type = "email"
                                    placeholder = "Email"
                                    required
                                    value = {loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className = "loginPassword">
                                <LockOpenIcon/>
                                <input
                                    type = "password"
                                    placeholder='Password'
                                    required
                                    value = {loginPassword}
                                    onChange = {(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to = "/password/forgot"> Forgot Password ? </Link>
                            <input type = "submit" value = "Login" className = "loginBtn"/>
                            <button className = "loginBtn" onClick = {logInWithAdminHandler}>Login With Admin</button>
                            <button className = "loginBtn" onClick = {logInWithAdminHandler2}>Login With User</button>
                        </form>
                        <form 
                            className = "signUpForm" 
                            ref = {registerTab} 
                            encType='multipart/form-data'
                            onSubmit={registerSubmit}
                            >
                            <div className = "signUpName">
                                <FaceIcon/>
                                <input
                                    type = "text"
                                    placeholder = "Name"
                                    required
                                    name = "name"
                                    value = {name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className = "signUpEmail">
                                <MailOutlineIcon/>
                                <input
                                    type = "email"
                                    placeholder = "Email"
                                    required
                                    name = "email"
                                    value = {email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className = "registerPassword">
                                <LockOpenIcon/>
                                <input
                                    type = "password"
                                    placeholder='Password'
                                    required
                                    name = "password"
                                    value = {password}
                                    onChange = {registerDataChange}
                                />
                            </div>
                            <div id = "registerImage">
                                <img src = {avatarPreview} alt = "avatar preview"/>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input
                                type = "submit"
                                value = "Register"
                                className = "signUpBtn"
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

export default LoginSignup
