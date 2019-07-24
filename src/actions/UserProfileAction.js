import axios from 'axios';

export const updateProfile = (formData) => dispatch => {
    axios.put(process.env.REACT_APP_API_URL+'/profile', formData, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: res.data,
        })
    }).catch(err =>{
        dispatch({
            type: 'UPDATE_PROFILE_ERROR',
            payload: err.response.data,
        })
    })
}

export const getAddresses = (formData) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/showaddress', { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'LIST_ADDRESS',
            payload: res.data.product,
        })
    })
}

export const addUserAddress = (formData) => dispatch => {
    axios.post(process.env.REACT_APP_API_URL+'/address', formData, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'ADD_ADDRESS',
            payload: res.data,
        })
    }).catch(err =>{
        dispatch({
            type: 'ADD_ADDRESS_ERROR',
            payload: err.response.data,
        })
    })
}

export const editUserAddress = (addDetails) => dispatch => {
    axios.put(process.env.REACT_APP_API_URL+'/updateaddress', addDetails, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'UPDATE_ADDRESS',
            payload: res.data,
        })
    }).catch(err =>{
        dispatch({
            type: 'UPDATE_ADDRESS_ERROR',
            payload: err.response.data,
        })
    })
}

export const deleteUserAddress = (addressId) => dispatch => {
    axios.delete(process.env.REACT_APP_API_URL+'/deleteaddress/'+addressId, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        console.log(res);
        dispatch({
            type: 'ADD_ADDRESS',
            payload: res.data,
        })
    }).catch(err =>{
        dispatch({
            type: 'ADD_ADDRESS_ERROR',
            payload: err.response.data,
        })
    })
}

export const getOrderHistoryDetails = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/order', { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        dispatch({
            type: 'ORDER_HISTORY',
            payload: res.data,
        })
    }).catch(err =>{
        dispatch({
            type: 'ORDER_HISTORY_ERROR',
            payload: err.response.data,
        })
    })
}