import React, {Fragment, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './Search.css'
import MetaData from '../layouts/MetaData'

function Search() {
    const history = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history(`/products/${keyword}`);
        }else{  
            history(`/products/`);
        }
    }



    return (
        <Fragment>
            <MetaData title = "Search -- Ecommerce"/>
            <form className = "searchBox" onSubmit={searchSubmitHandler}>
                <input 
                    type = "text"
                    placeholder='search a product...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type = "submit" value = "search..."/>
            </form>
        </Fragment>
    )
}

export default Search
