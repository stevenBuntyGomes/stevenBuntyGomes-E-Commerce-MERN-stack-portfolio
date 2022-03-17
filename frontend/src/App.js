import React, {useEffect, useState} from 'react'
import './App.css';
import Header from './component/layouts/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import Footer from './component/layouts/Footer/Footer'
import Home from './component/Home/Home'
import Loader from './component/layouts/Loader/Loader'
import ProductDetail from './component/Product/ProductDetail'
import Products from './component/Product/Products'
import Search from './component/Product/Search'
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction'
import UserOptions from './component/layouts/Header/UserOptions'
import {useSelector, useDispatch} from 'react-redux'
import Profile from './component/User/Profile'
import ProtectedRoute from './component/Route/ProtectedRoute'
import UpdateProfile from './component/User/UpdateProfile'
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword'
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import StripeRoute from './component/Route/StripeRoute'
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList'
import NewProduct from './component/Admin/NewProduct'
import UpdateProduct from './component/Admin/UpdateProduct'
import OrderList from './component/Admin/OrderList'
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews'
import NotFound from './component/layouts/NotFound/NotFound'
import Contact from './component/Information/Contact';
import About from './component/Information/About';





function App() {
  const {isAuthenticated, user}  = useSelector(state => state.user);
  const [stripeApikey, setStripeApiKey] = useState("");
  async function getStripeApiKey(){
    // const {data} = await axios.get(`/api/v1/stripeapikey`);
    setStripeApiKey("pk_test_51KLlRLGZWH36KSLtX8h3PuMMvnXHRmzyTSKMS0gVoQY3ZCa08CPKRfRx5D1gcL95aDhQrstZ3qshloGo5cjTxGfX00zxyTfEmh");
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
        <Header user = {user}/>
        {isAuthenticated && <UserOptions user = {user}/>}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/product/:id" element={<ProductDetail/>} />
          <Route exact path="/products" element={<Products/>} />
          <Route path="/products/:keyword" element={<Products/>} />
          <Route exact path="/Search" element={<Search/>} />
          <Route exact path="/login" element={<LoginSignUp/>} />
          <Route element={<ProtectedRoute/>}>
              <Route exact path="/account" element={<Profile/>} />
              <Route exact path="/me/update" element={<UpdateProfile/>} />
              <Route exact path="/password/update" element={<UpdatePassword/>} />
              <Route exact path="/shipping" element={<Shipping/>} />
              
              {stripeApikey && (
                <Route element={<StripeRoute/>}>
                  <Route exact path="/process/payment" element={<Payment/>} />
                </Route>
              )}
              <Route exact path="/success" element={<OrderSuccess/>} />
              <Route exact path="/my/orders" element={<MyOrders/>} />
              <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
              <Route exact path="/order/:id" element={<OrderDetails/>} />
              <Route isAdmin = {true} exact path="/admin/dashboard" element={<Dashboard/>} />
              <Route isAdmin = {true} exact path="/admin/products" element={<ProductList/>} />
              <Route isAdmin = {true} exact path="/admin/product" element={<NewProduct/>} />
              <Route isAdmin = {true} exact path="/admin/product/:id" element={<UpdateProduct/>} />
              <Route isAdmin = {true} exact path="/admin/orders" element={<OrderList/>} />
              <Route isAdmin = {true} exact path="/admin/order/:id" element={<ProcessOrder/>} />
              <Route isAdmin = {true} exact path="/admin/users" element={<UsersList/>} />
              <Route isAdmin = {true} exact path="/admin/user/:id" element={<UpdateUser/>} />
              <Route isAdmin = {true} exact path="/admin/reviews" element={<ProductReviews/>} />

        
              
          </Route>
          <Route exact path="/password/forgot" element={<ForgotPassword/>} />
          <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/about" element={<About/>} />
          {/* <Route exact element={
            window.location.pathname === "/process/payment" ? null : <NotFound/>
          } /> */}
          <Route path='*' element={<NotFound/>} />
          {/* <Route exact path="/account" element={<ProtectedRoute/>} component = {Profile}/> */}
          {/* <Route exact path="/account" element={<Profile/>}/> */}
          {/* <Route exact path="/sad" element={<Loader/>} /> */}
        </Routes>
        
        <Footer/>
    </Router>
    
  );
}

export default App;
