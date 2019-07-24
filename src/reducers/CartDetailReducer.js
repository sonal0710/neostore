export default (state = {}, action) => {
    switch (action.type) {
        case 'CART_DETAILS':
            return {
                ...state,
                cartDetails: action.payload,
                deleleCartFlag: false,
                addCartFlag: false
                }
        case 'REMOVE_CART':
            return {
                ...state,
                deleleCartFlag: true
                }
        case 'ADDED_TO_CART':
            return {
                ...state,
                addCartFlag: true
                }
     default:
      return state
    }
}