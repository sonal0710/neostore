import axios from 'axios';

export const getProductDetails = (id) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/productByBoth?_id='+id)
    .then(res => {
        dispatch({
            type: 'GET_PRODUCT_DETAILS',
            payload: res.data,
        })
    })
}

export const productRating = (ratingDetails) => dispatch => {
    axios.put(process.env.REACT_APP_API_URL+'/updaterating', ratingDetails, { headers: { Authorization: localStorage.getItem('logintoken') } })
    .then(res => {
        console.log(res);
        dispatch({
            type: 'UPDATE_RATING',
            payload: res.data,
        })
    }).catch(err => {
        dispatch({
            type: 'UPDATE_RATING_ERROR',
            payload: err.response.data,
        })
    })
}

export const getAllCategories = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/allCategory')
    .then(res => {
        dispatch({
            type: 'GET_CATEGORIES',
            payload: res.data.product,
        })
    })
}

export const getAllColors = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/allColor')
    .then(res => {
        dispatch({
            type: 'GET_COLORS',
            payload: res.data.product,
        })
    })
}

export const getAllProducts = (sortParameters) => dispatch => {
    let urlOrderParam = '';
    let pageDetails = '';
    if(sortParameters.order === 'desc'){
        urlOrderParam = '&desc=true';
    }
    if(sortParameters.activePage){
        pageDetails = '&page='+sortParameters.activePage+'&limit=5'
    }
    axios.get(process.env.REACT_APP_API_URL+'/productByBoth?category_id='+sortParameters.category_id+'&color_id='+sortParameters.color_id+'&sortBy='+sortParameters.sortBy+''+urlOrderParam+''+pageDetails)
    .then(res => {
        dispatch({
            type: 'GET_ALL_PRODUCTS',
            payload: res.data.product,
        })
    })
}

export const totalProductCount = (sortParameters) => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/productByBoth?category_id='+sortParameters.category_id+'&color_id='+sortParameters.color_id)
    .then(res => {
        dispatch({
            type: 'TOTAL_PRODUCT_COUNT',
            payload: res.data.count,
        })
    })
}