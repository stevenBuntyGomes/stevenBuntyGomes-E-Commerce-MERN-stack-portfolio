import React, {useEffect} from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import './OrderSuccess.css'

function OrderSuccess() {
  const history = useNavigate();
  const redirect = (e) => {
    e.preventDefault();
    history(`/my/orders`);
  }

  useEffect(() => {

  }, [history]);
  return (
    <div className = "orderSuccess">
        <CheckCircleIcon/>

        <Typography>Your Order has been Placed successfully</Typography>
        <Button onClick={redirect}>View Orders</Button>
    </div>
  )
}

export default OrderSuccess