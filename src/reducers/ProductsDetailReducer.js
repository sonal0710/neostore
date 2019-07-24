export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_DETAILS':
            return {
                ...state,
                productDetails: action.payload.product[0],
                updateRating: false,
                errorRating: '',
                successRating: ''
            }
        case 'UPDATE_RATING':
            return {
                ...state,
                updateRating: true,
                successRating: 'Rated Successfully'
            }
        case 'UPDATE_RATING_ERROR':
            return {
                ...state,
                updateRating: true,
                errorRating: 'Already Rated'
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                allCategories: action.payload
            }
        case 'GET_COLORS':
            return {
                ...state,
                allColors: action.payload
            }
        case 'GET_ALL_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload
            }
        case 'TOTAL_PRODUCT_COUNT':
            return {
                ...state,
                totalProductCount: action.payload
            }
     default:
      return state
    }
}