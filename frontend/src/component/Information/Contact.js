import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import './Contact.css'

function Contact() {
  return (
    <div className = "orderSuccess">
        <CheckCircleIcon/>

        <Typography>Contuct Us on our website</Typography>
        <Link to="/">Contact Us</Link>
    </div>
  )
}

export default Contact