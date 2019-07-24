export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            localStorage.setItem('user_details', JSON.stringify(action.payload.details));
            return {
                ...state,
                userProfileStatus: true
            }
        case 'UPDATE_PROFILE_ERROR':
            return {
                ...state,
                userProfileStatus: false
            }
        case 'ADD_ADDRESS':
            return {
                ...state,
                addAddressStatus: true,
                addAddressMessage: action.payload
            }
        case 'ADD_ADDRESS_ERROR':
            return {
                ...state,
                addAddressStatus: false,
                addAddressMessage: action.payload
            }
        case 'LIST_ADDRESS':
            localStorage.setItem('addresses', JSON.stringify(action.payload));
            return {
                ...state,
                userAddressList: action.payload,
                addAddressStatus: false,
                updateAddressStatus: false
            }
        case 'UPDATE_ADDRESS':
            return {
                ...state,
                updateAddressStatus: true
            }
        case 'UPDATE_ADDRESS_ERROR':
            return {
                ...state,
                updateAddressStatus: false
            }
        case 'ORDER_HISTORY':
            return {
                ...state,
                orderHistoryDetails: action.payload
            }
        case 'ORDER_HISTORY_ERROR':
            return {
                ...state,
                orderHistoryDetails: action.payload
            }
        default:
            return state
        }
}