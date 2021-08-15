import * as actionTypes from "./actionTypes";


const initState = {
    currencies: null,
    categories: null,
    cart: {},
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

    store_cart(cart)
    return {
        ...state,
        cart: cart
    }
}

const remove_product_form_cart = (state, action) => {

    const cart = {...state.cart}
    delete cart[action.id]

    store_cart(cart)
    return {
        ...state,
        cart: cart
    }
}



const upddate_amount = (state, action) => {
    const cart = {...state.cart};
    cart[action.id].amount = action.amount
    store_cart(cart)
    return {
        ...state,
        cart: cart
    }
}

const init_cart = (state, action) => {
    return {
        ...state,
        cart: action.cart
    }
}


export const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENCIES: return set_currencies(state, action)
        case actionTypes.SET_CATEGORIES: return set_categories(state, action)
        case actionTypes.SET_PRODUCTS: return set_products(state, action)
        case actionTypes.SET_CURRENCY: return set_currency(state, action)
        case actionTypes.ADD_PRODUCT_TO_CART: return add_product_to_cart(state, action)
        case actionTypes.REMOVE_PRODUCT_FROM_CART: return remove_product_form_cart(state, action)
        case actionTypes.UPDATE_AMOUNT: return upddate_amount(state, action)
        case actionTypes.INIT_CART: return init_cart(state, action)
        default: return state
    }
}   


const store_cart = (cartClone) => {
    const storeTime = new Date().getTime();
    localStorage.setItem("cart_storeTime", storeTime);
    localStorage.setItem("cart", JSON.stringify(cartClone));
}