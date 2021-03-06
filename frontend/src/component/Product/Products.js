import React, {Fragment, useEffect, useState} from 'react'
import  { clearErrors, getProduct } from "../../actions/productAction"
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layouts/Loader/Loader'
import ProductCard from '../Home/Product'
import { useParams } from "react-router-dom"
import Pagination from "react-js-pagination";
import {Slider} from '@mui/material'
import {Typography} from '@mui/material'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'
import './Products.css'

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "iphone",
    "SmartPhones",
    "Book",
  ];

function Products({ match }) {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {products, 
        loading, 
        error, 
        productCount, 
        resultPerPage, 
        filteredProductsCount
    } = useSelector((state) => state.products);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    let count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title = "PRODUCTS -- E-Commerce"/>
                    <h2 className = "productsHeading"> Products </h2>
                    <div className = "products">
                        {products && products.map((product) => (
                            <ProductCard key = {product._id} product = {product}/>
                        ))}
                    </div>
                    <div className = "filterBox">
                        <Typography>Price</Typography>
                        <Slider 
                            value = {price}
                            onChange = {priceHandler}
                            valueLabelDisplay="on"
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className = "categoryBox">
                            {categories.map((category) => (
                                <li
                                    className = "category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component = "legend">Ratings Above</Typography>
                            <Slider 
                            value = {ratings}
                            onChange = {(e, newRating) => {
                                setRatings(newRating);
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={5}
                        />
                        </fieldset>
                    </div>
                    {resultPerPage < count && (
                        <div className = "paginationBox">
                        <Pagination 
                            activePage = {currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products
