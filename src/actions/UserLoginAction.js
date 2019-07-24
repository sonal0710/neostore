import axios from 'axios';

export const userLogin = (login_details) => dispatch => {
    axios.post(process.env.REACT_APP_API_URL+'/login', login_details)
    .then(res => {
        if(res.data.status_code == 200){
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data,
            })
        }else{
            dispatch({
                type: 'USER_LOGIN_FAILED',
                payload: res.data,
            })
        }
        
    }).catch(err => {
        dispatch({
            type: 'USER_LOGIN_FAILED',
            payload: err.response.data,
        })
    })
}

export const userRegister = (regisDetails) => dispatch => {
    axios.post(process.env.REACT_APP_API_URL+'/customerRegis', regisDetails)
    .then(res => {
        if(res.data.status_code == 200){
            dispatch({
                type: 'USER_REGISTER',
                payload: res.data,
            })
        }else{
            dispatch({
                type: 'USER_REGISTER_FAILED',
                payload: res.data,
            })
        }
        
    }).catch(err => {
        console.log(err.response.data);
        dispatch({
            type: 'USER_REGISTER_FAILED',
            payload: err.response.data,
        })
    })
}