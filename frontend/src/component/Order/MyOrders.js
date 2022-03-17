import React, {useEffect, Fragment} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux'
import {myOrders, clearErrors} from '../../actions/orderAction'
import './MyOrders.css'
import { Link } from 'react-router-dom'
import {Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Loader from '../../component/layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import LaunchIcon from '@mui/icons-material/Launch'; 
import { useAlert } from 'react-alert';


function MyOrders() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, error, order } = useSelector((state) => state.myOrders);

  const columns = [
    {
      field: "id", 
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    }, 
    {
      field: "status",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    }, 
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to = {`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon/>
          </Link>
        );
      }
    }
  ];
  const rows = [];

  order && order
  .forEach((item, index) => {
    rows.push({
      itemsQty: item.orderItems.length,
      id: item._id,
      status: item.orderStatus,
      amount: item.totalPrice,
    });
  });

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      <MetaData title = {`${user.name} - Orders`}/>
      {loading ? (
        <Loader/>
      ) : (
        <div className = "myOrdersPage">
          <DataGrid
            rows = {rows}
            columns = {columns}
            pageSize = {10}
            disableSelectionOnClick
            className = "myOrdersTable"
            autoHeight
          >
          </DataGrid>
          <Typography id = "myOrdersHeading">
            {user.name}'s Orders
          </Typography>
        </div> 
      )
        
    }
    </Fragment>
  )
}

export default MyOrders