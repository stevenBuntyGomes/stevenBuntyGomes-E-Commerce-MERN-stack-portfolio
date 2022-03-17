import React, { Fragment, useEffect } from 'react'
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layouts/MetaData'
import  { clearErrors, getProduct } from "../../actions/productAction"
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layouts/Loader/Loader'
import { useAlert } from "react-alert";

function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productCount} = useSelector(state => state.products);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {loading ? (<Loader/>) : (
                <Fragment>
                    <MetaData title="ECOMMERCE" />
                    <div className = "banner">
                        <p>welcome to E-commerce</p>
                        <h1>Find Amazing products below</h1>
                        <a href="#container">
                            <button>
                                Scroll <MouseOutlinedIcon />
                            </button>
                        </a>
                    </div>
                    <h2 className = "homeHeading">
                        Featured products
                    </h2>
                    <div className = "container" id = "container">
                        {products && products.map((product) => 
                            <Product key = {product._id} product = {product} />
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
        
    )
}

export default Home
