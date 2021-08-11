import axios from "../axois";
import * as actionTypes from "./actionTypes";
import * as queries from "./queries";

const set_currencies = (curs) => ({type: actionTypes.SET_CURRENCIES, currencies: curs})
const set_categories = (cats) => ({type: actionTypes.SET_CATEGORIES, categories: cats})
const set_products = (products) => ({type: actionTypes.SET_PRODUCTS, products: products})
export const set_currency = (cur) => ({type: actionTypes.SET_CURRENCY, currency: cur})



export const req_currencies = () => {
    return (dispatch) => {
        axios({
            data: {
                query: queries.CURRENCY_QUERY
            }
        })
        .then(res => {
            dispatch(set_currencies(res.data.data.currencies))
        })
        .catch(err => console.log(err))
    }
}

export const req_categories = () => {
    return (dispatch) => {
        axios({
            data: {
                query: queries.CATEGORIES_QUERY
            }
        })
        .then(res => {
            dispatch(set_categories(res.data.data.categories))
        })
        .catch(err => console.log(err.response))
    }
}   

export const req_products = () => {
    return (dispatch) => {
        axios({
            data: {
                query: queries.PRODUCTS_QUERY
            }
        })
        .then(res => {
            dispatch(set_products(res.data.data.categories))
        })
        .catch(err => console.log(err.response))
    }
} 