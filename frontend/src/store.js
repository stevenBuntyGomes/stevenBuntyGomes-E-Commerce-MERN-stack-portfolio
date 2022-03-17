import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    productReducer, 
    productDetailsReducer, 
    newReviewReducer, 
    newProductReducer, 
    productDelReducer,
    productUpdateReducer, 
    productReviewsReducer,
    reviewReducer,
} from './reducers/productReducer';
import {userReducer, profileReducer, allUsersReducer, userDetailsReducer, forgotPasswordReducer} from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer';
import { 
    newOrderReducer, 
    myOrdersReducer, 
    orderDetailsReducer, 
    allOrdersReducer,
    orderReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productDelReducer,
    productUpdate: productUpdateReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

        shippingInfo: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : {},
    }
};

const middleware = [thunk]; 

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;