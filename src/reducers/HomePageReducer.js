export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_BANNER':
            return {
                ...state,
                banners: action.payload
                }
        case 'GET_BANNER_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'GET_FEATURED_PRODUCT':
            return {
                ...state,
                featuredProducts: action.payload
            }
     default:
      return state
    }
}