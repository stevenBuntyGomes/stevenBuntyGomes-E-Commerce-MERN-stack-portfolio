import React from 'react'
import PlayStore from '../../../images/playstore.png'
import AppStore from '../../../images/appstore.png'
import './Footer.css'

function Footer() {
    return (
        <footer id = "footer">
            <div className = "leftFooter">
                <h4>Download Our APP</h4>
                <p>Download App for Android and Ios mobile phone</p>
                <img src = {PlayStore} alt = "playstore"/>
                <img src = {AppStore} alt = "appstore"/>
            </div>
            <div className = "midFooter">
                <h1>Ecommerce</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2021 &copy; MeAbhiSingh</p>
            </div>
            <div className = "rightFooter">
                <h4>Follow Us On</h4>
                <a href = "https://www.facebook.com/buntys.gomes">Facebook</a>
                <a href = "https://www.facebook.com/buntys.gomes">Instagram</a>
                <a href = "https://www.facebook.com/buntys.gomes">Youtube</a>
            </div>
        </footer>
    )
}

export default Footer
