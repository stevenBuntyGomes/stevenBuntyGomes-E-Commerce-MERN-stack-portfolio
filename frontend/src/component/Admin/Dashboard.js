import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {Typography} from '@mui/material'
import MetaData from '../layouts/MetaData'
import './Dashboard.css'
import Sidebar from './Sidebar'
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut, Line, Chart } from 'react-chartjs-2'
import { clearErrors, getAdminProducts } from '../../actions/productAction'
import {getAllOrders} from '../../actions/orderAction'
import {getAllUsers} from '../../actions/userAction'
import {useSelector, useDispatch} from 'react-redux'
import { useAlert } from "react-alert"; 

function Dashboard() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {products} = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let [productsLength, setProductLength] = useState(0);
  let [ordersLength, setOrdersLength] = useState(0);
  let [usersLength, setUsersLength] = useState(0);
  
  let outOfStock = 0;
  products && products.forEach((item) => {
    if(item.stock === 0){
      outOfStock += 1;
    }
  });


  let totalAmount = 0;
  orders && orders.forEach((item) => {
    totalAmount+=item.totalPrice;
  });

  useEffect(() => {

    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());

    products && setProductLength(products.length);
    orders && setOrdersLength(orders.length);
    users && setUsersLength(users.length);

  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, productsLength - outOfStock],
        // data: [10, 2],
      },
    ],
  };

  

  
  return (
    <div className = "dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar/>
        <div className = "dashboardContainer">
            <Typography component="h1">Dashboard</Typography>
            <div className = "dashboardSummary">
              <div>
                <p>
                  Total Amount <br/> TK.{totalAmount}
                </p>
              </div>
              <div className = "dashboardSummaryBox2">
                <Link to = "/admin/products">
                  <p>Product</p>
                  <p>{productsLength && productsLength}</p>
                  
                </Link>
                <Link to = "/admin/orders">
                  <p>Orders</p>
                  <p>{ordersLength}</p>
                  
                </Link>
                <Link to = "/admin/users">
                  <p>Users</p>
                  <p>{usersLength}</p>
                  
                </Link>
                <Link to = "/admin/users">
                  <p>Out Of Stock</p>
                  <p>{outOfStock}</p>
                  
                </Link>
              </div>
            </div>
            <div className = "lineChart">
              <Line
                data={lineState} 
              />
            </div>
            <div className = "doughnutChart">
              <Doughnut
                data={doughnutState} 
              />
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard