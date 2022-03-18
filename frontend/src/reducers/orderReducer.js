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

export const newOrderReducer = (state = {}, action) => {
     switch (action.type) {
         case CREATE_ORDER_REQUEST:
             return {
                 ...state,
                 loading: true,
             }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        
        default: 
            return state; 
     }
}

// individual orders reducer
export const myOrdersReducer = (state = {orders: []}, action) => {
     switch (action.type) {
         case My_ORDERS_REQUEST:
             return {
                 loading: true,
             }
        case My_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            }

        case My_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        
        default: 
            return state; 
     }
}
// all orders reducer
export const allOrdersReducer = (state = {orders: []}, action) => {
     switch (action.type) {
         case ALL_ORDER_REQUEST:
             return {
                 loading: true,
             }
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            }

        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        
        default: 
            return state; 
     }
}
// update and delete orders reducer
export const orderReducer = (state = {}, action) => {
     switch (action.type) {
         case UPDATE_ORDER_REQUEST:
         case DELETE_ORDER_REQUEST:
             return {
                 ...state,
                 loading: true,
             }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case UPDATE_ORDER_RESET:
            return {
                loading: false,
                isUpdated: false,
            }
        case DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        
        default: 
            return state; 
     }
}


// order details reducer
export const orderDetailsReducer = (state = {order: {}}, action) => {
     switch (action.type) {
         case ORDER_DETAILS_REQUEST:
             return {
                 loading: true,
             }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        
        default: 
            return state; 
     }
}