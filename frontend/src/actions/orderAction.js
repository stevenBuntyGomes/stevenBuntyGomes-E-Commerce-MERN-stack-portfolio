import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    My_ORDERS_REQUEST,
    My_ORDERS_SUCCESS,
    My_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
} from '../consants/orderConsants'
import axios from 'axios'

// create order
export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: My_ORDERS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post("/api/v1/order/new", order, config);

        dispatch({type: My_ORDERS_SUCCESS, payload: data});

    }catch(error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// my orders
export const myOrders = () => async (dispatch) => {
    try{
        dispatch({type: My_ORDERS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.get("/api/v1/orders/me");

        dispatch({type: My_ORDERS_SUCCESS, payload: data.orders});

    }catch(error) {
        dispatch({
            type: My_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
}
// get all orders
export const getAllOrders = () => async (dispatch) => {
    try{
        dispatch({type: ALL_ORDER_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.get("/api/v1/admin/orders");

        dispatch({type: ALL_ORDER_SUCCESS, payload: data.orders});

    }catch(error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// update order
export const updateOrder = (id, order) => async (dispatch, getState) => {
    try{
        dispatch({type: UPDATE_ORDER_REQUEST});
        const config = {
            headers: {"Content-Type": "application/json"},
        };
        const {data} = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({type: UPDATE_ORDER_SUCCESS, payload: data.success});

    }catch(error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}
// delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: DELETE_ORDER_REQUEST});
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({type: DELETE_ORDER_SUCCESS, payload: data.success});

    }catch(error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// my orderDetails
export const getOrderDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.get(`/api/v1/order/${id}`);

        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order});

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}