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



export const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENCIES: return set_currencies(state, action)
        case actionTypes.SET_CATEGORIES: return set_categories(state, action)
        default: return state
    }
}   