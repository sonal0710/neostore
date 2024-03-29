export default (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            localStorage.setItem('logintoken', action.payload.token);
            localStorage.setItem('loginstatus', true);
            localStorage.setItem('user_details', JSON.stringify(action.payload.data));
            localStorage.setItem('addresses', JSON.stringify(action.payload.Address));
            return {
                ...state,
                loginStatus: true,
                loginMessage: '',
                loginError: false
            }
        case 'USER_LOGIN_FAILED':
            return {
                ...state,
                loginStatus: false,
                loginMessage: 'Invalid Credentials',
                loginError: true
            }
        case 'USER_REGISTER':
            return {
                ...state,
                registrationStatus: true,
                registrationMessage: action.payload.message
            }
        case 'USER_REGISTER_FAILED':
            return {
                ...state,
                registrationStatus: false,
                registrationMessage: action.payload.message
            }
        case 'SET_LOGIN_FLAG':
            return{
                ...state,
                loginStatus: false,
                loginError: false
            }
     default:
      return state
    }
}