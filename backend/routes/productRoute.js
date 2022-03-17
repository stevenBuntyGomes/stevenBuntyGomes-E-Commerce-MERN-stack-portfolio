const express = require('express');
const { 
    getAllproducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// create products admin routes
// router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAllproducts);
router.route('/products').get(getAllproducts);

// get all products --general routes
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route('/products/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
// admin products
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;