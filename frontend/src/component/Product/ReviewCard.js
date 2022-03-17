import React from 'react'
import {Rating} from '@mui/lab'
import profilePng from '../../images/profileImage.png'
import './ProductDetail.css'

function ReviewCard({review}) {


    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <div className = "reviewCard">
            <img src = {profilePng} alt = "User"/>
            <p>{review.name}</p>
            <Rating {...options}/>
            <span className = "reviewCardComment">{review.comment}</span>
        </div>
    )
}

export default ReviewCard
