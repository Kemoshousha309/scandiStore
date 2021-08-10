import axios from "../axois";
import * as actionTypes from "./actionTypes";
import * as queries from "./queries";

const set_currencies = (curs) => ({type: actionTypes.SET_CURRENCIES, currencies: curs})
const set_categories = (cats) => ({type: actionTypes.SET_CATEGORIES, categories: cats})


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