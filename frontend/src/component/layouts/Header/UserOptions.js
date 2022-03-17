import React, {Fragment, useState} from 'react';
import './Header.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Backdrop from '@mui/material/Backdrop';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import {useAlert} from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

function UserOptions({ user }) {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  

  const options = [
    // {icon: <Dashboard/>, name: "Dashboard", func: orders},
    {icon: <ListAltIcon/>, name: "Orders", func: orders},
    {icon: <PersonIcon/>, name: "Profile", func: account},
    {
      icon: <ShoppingCart style = {{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>, 
      name: `ShoppingCart ${cartItems.length}`, 
      func: cart
    },
    {icon: <ExitToAppIcon/>, name: "logout", func: logoutUser},
  ];

  if(user.role === "admin"){
    options.unshift({
      icon: <DashboardIcon/>, name: "Dashboard", func: dashboard
    });
  }

  function dashboard(){
      history(`/admin/dashboard`);
  }
  function orders(){
      history(`/my/orders`);
  }
  function account(){
      history(`/account`);
  }
  function cart(){
      history(`/cart`);
  }
  function logoutUser(){
      dispatch(logout());
      alert.success("logout successfully");
  }

  return <Fragment>
      <Backdrop open = {open} style = {{ zIndex: "10" }}/>
      <SpeedDial 
        ariaLabel='speed dial tooltip example'
        onClose = {() => setOpen(false)}
        onOpen= {() => setOpen(true)}
        open = {open}
        style = {{ zIndex: "11" }}
        className="speedDial"
        icon = {<img
        className = "speedDialIcon"
        src = {user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt = "Profile"
        />}
        direction = "down"
      >
      {options.map((item) => (
        <SpeedDialAction
          key = {item.name}
          icon = {item.icon}
          tooltipTitle = {item.name}
          onClick={item.func}
          tooltipOpen = {window.innerWidth <= 600 ? true : false}
        />
      ))}
      
      </SpeedDial>
  </Fragment>;
}

export default UserOptions;
