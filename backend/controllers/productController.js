const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require("cloudinary"); 

// create product --admin controller
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        let images = [];
        if(typeof req.body.images === "string"){
            images.push(req.body.images);
        }else{
            images = req.body.images;
        }

        // upload images
        const imagesLink = [];
        for(i = 0; i < images.length; i++){
            result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLink;
        req.body.user = req.user.id;
        const product = await productModel.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    }
);

// general controller
exports.getAllproducts = async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await productModel.countDocuments();
    // const apiFeatures = new APIFeatures(Product.find().exec(), req.query)
    // .search()
    // .filter();
    
    const apiFeature = new ApiFeatures(productModel.find(), req.query).search().filter()
    let products = await apiFeature.query.clone();
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query; 
    
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });
}


// update product
exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({success: false, message: "no products with id found"});
        }

        // images part start here
        let images = [];
        if(typeof req.body.images === "string"){
            images.push(req.body.images);
        }else{
            images = req.body.images;
        }

        if(images !== "undefined"){
            // deleting images from cloudanary
            
            for(let i = 0; i < product.images.length; i++){
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
            // deleting images from cloudanary

            // upload images
            const imagesLink = [];
            for(i = 0; i < images.length; i++){
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLink;
        }


        product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    
        res.status(200).json({
            success: true,
            product
        });
    }
);

exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await productModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({success: false, message: "no products with id found"});
        }

        // deleting images from cloudanary

        for(let i = 0; i < product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    
        await product.remove();
        return res.status(200).json({
            success: true, 
            message: "product deleted"
        });
    
    }
);

// get product details
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        let product = await productModel.findById(req.params.id);
        
        if(!product){
            // return next(await new ErrorHandler("product not found", 404));
            return res.status(500).json({success: false, message: "no products with id found"});
        }
    
        res.status(200).json({
            success: true,
            product
        });
        
    }
);

// create new review or update review
exports.createProductReview = catchAsyncErrors(
    async (req, res, next) => {
        const {rating, comment, productId} = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        }

        // console.log(rating);
        // console.log(comment);
        // console.log(productId);
        // console.log(review);
        // return;

        const product = await productModel.findById(productId);
        // if(!product){
        //     console.log("product id not found");
        // }else{
        //     console.log(product);
        //     return;
        // }

        

        const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user._id.toString());
        
        if(isReviewed){
            
            product.reviews.forEach((rev) => {
                if(rev.user.toString()===req.user._id.toString()){
                    (rev.rating = rating),
                    (rev.comment = comment)
                }
            });
        }else{
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // console.log(isReviewed);

        let avg = 0;
        // product reviews rating function
        product.reviews.forEach((rev) => {
            // avg = avg + rev.rating;
            avg += rev.rating;
        });
        
        product.ratings = avg / product.reviews.length;

        await product.save({validateBeforeSave: false});

        res.status(200).json({
            success: true,
        });
    }
);


exports.getProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        const product = await productModel.findById(req.query.productId);

        if(!product){
            return next(new ErrorHandler("product not found", 404));
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
    }
    
);

exports.deleteReview = catchAsyncErrors(
    async (req, res, next) => {
        const product = await productModel.findById(req.query.productId);

        
        if(!product){
            return next(new ErrorHandler("product not found", 404));
        }

        const reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== req.query.id.toString()
        );
        
        
        // change rtinig

        let avg = 0;
        // product reviews rating function
        reviews.forEach((rev) => {
            // avg = avg + rev.rating;
            avg += rev.rating;
        });

        let ratings = 0;
        if(reviews.length === 0){
            ratings = 0;
        }else{
            ratings = avg / reviews.length;
        }


        const numOfReviews = reviews.length;

        await productModel.findByIdAndUpdate(
            req.query.productId,
            {
              reviews,
              ratings,
              numOfReviews,
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
          );
        
        res.status(200).json({
            success: true,
        });
    }
);


// get all products Admin
exports.getAdminProducts = async (req, res, next) => {
    const products = await productModel.find();
    
    res.status(200).json({
        success: true,
        products,

    });
}