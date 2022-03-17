import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

function OrderSuccess() {
  return (
    <div className = "orderSuccess">
        <CheckCircleIcon/>

        <Typography>Your Order has been Placed successfully</Typography>
        <Link to="/my/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess