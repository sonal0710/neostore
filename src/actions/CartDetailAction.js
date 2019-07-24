import axios from 'axios';

export const addToCart = (cartDetails) => dispatch => {
    axios.post(process.env.REACT_APP_API_URL+'/newCart', cartDetails, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        console.log(res);
        dispatch({
            type: 'ADDED_TO_CART',
            payload: res.data,
        })
    })
}

export const getAllCartDetails = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/cartDetails', { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'CART_DETAILS',
            payload: res.data.data,
        })
    })
}

export const deleteFromCart = (productId) => dispatch => {
    axios.delete(process.env.REACT_APP_API_URL+'/deletecart/'+productId, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'REMOVE_CART',
            payload: res.data.data,
        })
    })
}