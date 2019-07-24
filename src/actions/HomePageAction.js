import axios from 'axios';

export const getBanners = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/allCategory')
    .then(res => {
        dispatch({
            type: 'GET_BANNER',
            payload: res.data,
        })
    })
}

export const getFeturedProductList = () => dispatch => {
    axios.get(process.env.REACT_APP_API_URL+'/topRated')
    .then(res => {
        dispatch({
            type: 'GET_FEATURED_PRODUCT',
            payload: res.data,
        })
    })
}