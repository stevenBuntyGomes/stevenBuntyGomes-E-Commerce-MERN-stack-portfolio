import React, {useState, useEffect} from 'react'
import { addItemsToCart } from '../../../actions/cartAction'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom'
import {Button} from './Button'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { logout } from '../../../actions/userAction'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useAlert} from 'react-alert'



function Header() {
    const dispatch = useDispatch();
    const {isAuthenticated, user}  = useSelector(state => state.user);
    const [isClicked, setIsClicked] = useState(false);
    const alert = useAlert();

    const handleClick = (e) => {
        e.preventDefault();
        if(isClicked === true){
            setIsClicked(false);
        }else{
            setIsClicked(true);
        }

    }


    const MenuItems = [
        {
            title: 'Home',
            url: '/',
            cName: 'nav-links',
        },
        {
            title: 'Products',
            url: '/products',
            cName: 'nav-links',
        },
        {
            title: 'Contact',
            url: '/contact',
            cName: 'nav-links',
        },
        {
            title: 'About',
            url: '/about',
            cName: 'nav-links',
        },
    ];
    
    const authItems = [
        {
            title: 'Login/SignUp',
            url: '/login',
            cName: 'nav-links nav-links-button',
        },
        {
            title: 'Login/SignUp',
            url: '/login',
            cName: 'nav-links-mobile',
        },
    ];
    let loggedItems = [
        {
            title: 'Orders',
            url: '/my/orders',
            cName: 'nav-links-mobile',
            icon: <ListAltIcon className = "nav-links-icon"/>,
        },
        {
            title: 'Account',
            url: '/account',
            cName: 'nav-links-mobile',
            icon: <PersonIcon/>,
        },
        {
            title: 'Cart',
            url: '/cart',
            cName: 'nav-links-mobile',
            icon: <ShoppingCart/>,
        },
    ];

    if(isAuthenticated){
        if(user.role === "admin"){
            loggedItems.unshift({
                title: 'Dashboard',
                url: '/admin/dashboard',
                cName: 'nav-links-mobile',
                icon: <DashboardIcon/>,
            });
        }
    }

    const logoutUser = () => {
        dispatch(logout());
        alert.success("logout successfully");
    }


    return (
        // <ReactNavbar
        //     {...options}
        // />
        <nav className = "NavbarItems">
            <h1 className='navbar-logo'>
                E-commerce
            </h1>
            <div className = "menu-icon" onClick = {handleClick}>
                {isClicked && isClicked ? (
                    <ClearIcon className='fa-bars'/>

                ) : (
                    
                    <PlayCircleFilledWhiteIcon className='fa-bars'/>
                )}
            </div>
            <ul className = {isClicked && isClicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems && MenuItems.map((item, index) => (
                    <li onClick={() => setIsClicked(false)} key = {index} className = "nav-li">
                        <Link className = {item.cName} to = {item.url}>
                            {item.title}    
                        </Link>
                    </li>
                ))}

                {
                    isAuthenticated === false ? authItems && authItems.map((item, index) => (
                        <li onClick={() => setIsClicked(false)} key = {index} className = "nav-li">
                            <Link className = {item.cName} to = {item.url}>
                                {item.title}    
                            </Link>
                        </li>
                    )) : loggedItems && loggedItems.map((item, index) => (
                        <li onClick={() => setIsClicked(false)} key = {index} className = "nav-li">
                            <Link className = {item.cName} to = {item.url}>
                            {item.icon}<span className = "nav-text">{item.title}</span>   
                            </Link>
                        </li>
                    ))
                }
                {
                    isAuthenticated && (
                        <li onClick={logoutUser} className = "nav-li">
                            <Link className = "nav-links-mobile" to = "">
                                <ExitToAppIcon /> <span className = "nav-text">Logout</span>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Header
