import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import './Contact.css'

function About() {
  return (
    <div className = "orderSuccess">
        <CheckCircleIcon/>
        <Typography>Visit Our Website by clicking the link below.</Typography>
        <Link to="/">About Us</Link>
    </div>
  )
}

export default About