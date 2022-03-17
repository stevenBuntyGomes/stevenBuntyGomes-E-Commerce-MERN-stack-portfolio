import React, {useEffect, Fragment} from 'react'
import './OrderDetails.css'
import { Link } from 'react-router-dom'
import {Typography} from '@mui/material'
import MetaData from '../layouts/MetaData'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../component/layouts/Loader/Loader'
import { useAlert } from 'react-alert';
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import { useParams } from "react-router-dom"


function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, order } = useSelector((state) => state.orderDetails);
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);
  return (
      <Fragment>
          {loading ? (
          <Loader/>
        ) : (
            <Fragment>
                <MetaData title = "Order Details"/>
                <div className = "orderDetailsPage">
                    <div className = "orderDetailsContainer">
                        <Typography component = "h1">
                            Order #{order && order._id}
                        </Typography>
                        <Typography>Shipping Info</Typography>
                        <div className = "orderDetailsContainerBox">
                            <div>
                                <p>Name:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{
                                    order.shippingInfo && 
                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`    
                                }</span>
                            </div>
                        </div>
                        <Typography>Pyment:</Typography>
                        <div className = "orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo && 
                                        order.paymentInfo.status === "succeed"
                                        ? "greenColor" : "redColor"
                                    }
                                >
                                    {order.paymentInfo && 
                                        order.paymentInfo.status === "succeed"
                                        ? "PAID" : "NOT PAID"
                                    }
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className = "orderDetailsContainerBox">
                            <div>
                                <p
                                    className = {
                                        order.orderStatus && order.orderStatus === "Delivered"
                                        ? "greenColor" : "redColor"
                                    }
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className = "orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className='orderDetailsCartItemsContainer'>
                            {order.orderItems && 
                                order.orderItems.map((item) => (
                                    <div key = {item.product}>
                                        <img src = {item.image} alt = "Product"/>
                                        <Link to = {`/products/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X {item.price} = {" "}
                                            <b>{item.quantity * item.price}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
      </Fragment>
    
  )
}

export default OrderDetails