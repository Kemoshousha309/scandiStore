import * as actionTypes from "./actionTypes";


const initState = {
    currencies: null,
    categories: null,
}


const set_currencies = (state, action) => {
    return {
        ...state,
        currencies: action.currencies,
    }
}

const set_categories = (state, action) => {
    return {
        ...state,
        categories: action.categories,
    }
}

const set_products = (state, action) => {
    return {
        ...state,
        products: action.products,
    }
}

const set_currency = (state, action) => {
    return {
        ...state,
        currency: action.currency,
    }
}




export const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENCIES: return set_currencies(state, action)
        case actionTypes.SET_CATEGORIES: return set_categories(state, action)
        case actionTypes.SET_PRODUCTS: return set_products(state, action)
        case actionTypes.SET_CURRENCY: return set_currency(state, action)
        default: return state
    }
}   