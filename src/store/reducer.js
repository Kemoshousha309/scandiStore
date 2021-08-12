import * as actionTypes from "./actionTypes";


const initState = {
    currencies: null,
    categories: null,
    cart: {}
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

const add_product_to_cart = (state, action) => {

    const cart = {...state.cart}
    cart[action.product.id] = {
        ...action.product,
        amount: 1
    }

    return {
        ...state,
        cart: cart
    }
}


const upddate_amount = (state, action) => {
    const cartClone = {...state.cart};
    cartClone[action.id].amount = action.amount
    return {
        ...state,
        cart: cartClone
    }
}



export const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENCIES: return set_currencies(state, action)
        case actionTypes.SET_CATEGORIES: return set_categories(state, action)
        case actionTypes.SET_PRODUCTS: return set_products(state, action)
        case actionTypes.SET_CURRENCY: return set_currency(state, action)
        case actionTypes.ADD_PRODUCT_TO_CART: return add_product_to_cart(state, action)
        case actionTypes.UPDATE_AMOUNT: return upddate_amount(state, action)
        default: return state
    }
}   