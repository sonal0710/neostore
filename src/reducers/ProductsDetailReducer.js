export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_DETAILS':
            return {
                ...state,
                productDetails: action.payload.product[0],
                updateRating: false,
                errorRating: '',
                successRating: '',
                setFlagForProps: true
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
                errorRating: action.payload.message
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
                allProducts: action.payload,
                setFlagForProps: true
            }
        case 'TOTAL_PRODUCT_COUNT':
            return {
                ...state,
                totalProductCount: action.payload
            }
        case 'SET_FLAG':
            return {
                ...state,
                setFlagForProps: false
            }
        case 'SEARCH_PRODUCTS':
            return{
                ...state,
                searchedProducts: action.payload.product
            }
        case 'SEARCH_PRODUCTS_ERR':
            return{
                ...state,
                searchedProducts: []
            }
     default:
      return state
    }
}