import React, {Fragment, useState, useEffect} from 'react';
import './NewProduct.css'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import {Button} from '@mui/material'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import {NEW_PRODUCT_RESET} from '../../consants/productConsants'
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from 'react-router-dom'

function NewProduct() {

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const { loading, error, success } = useSelector((state) => state.newProduct);


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

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("product created successfully");
      history('/admin/dashboard');
      dispatch({type: NEW_PRODUCT_RESET});
    }
  }, [dispatch, error, alert, success, history]);
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className = "dashboard">
        <Sidebar/>
        <div className = "newProductContainer">
          <form
            className = "createProductForm"
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}
          >
              <h1>Create Product</h1>
              <div>
                <SpellcheckIcon/>
                <input
                  type = "text"
                  placeholder='Product Name'
                  required
                  value = {name}
                  onChange = {(e) => setName(e.target.value)}
                  
                />
              </div>
              <div>
                <AttachMoneyIcon/>
                <input
                  type = "number"
                  placeholder='Price'
                  required
                  onChange = {(e) => setPrice(e.target.value)}

                />
              </div>
              <div>
                <DescriptionIcon/>
                <textarea
                  placeholder='product description'
                  value = {description}
                  required
                  onChange = {(e) => setDescription(e.target.value)}

                />
              </div>
              <div>
                <AccountTreeIcon/>
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value = "">choose categories</option>
                  {
                    categories && categories.map((cate) => (
                      <option key = {cate} value = {cate}>
                        {cate}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div>
                <StorageIcon/>
                <input
                  type = "number"
                  placeholder='Stock'
                  required
                  onChange = {(e) => setStock(e.target.value)}

                />
              </div>
              <div id = "createProductFormFile">
                <input
                  type = "file"
                  name='avatar'
                  accept = "image/*"
                  multiple
                  onChange = {createProductImagesChange}
                />
              </div>
              <div id = "createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key = {index} src = {image} alt = "avatar preview"/>
                  ))}
              </div>
              <Button
                id = "createProductBtn"
                type = "submit"
                disabled = {loading ? true: false}
              >
                Create Product
              </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct