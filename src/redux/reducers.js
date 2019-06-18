import { actionTypes } from './actionTypes'
import { combineReducers } from 'redux'

function despesas(state = [], action) {
    switch (action.type) {
        case actionTypes.DESPESAS:
            return action.despesas
        case actionTypes.DELETE_DESPESA:
            return state.filter(despesa => despesa.id !== action.despesa.id)
        case actionTypes.CREATE_DESPESA:
            return [...state, action.despesa]
        case actionTypes.UPDATE_DESPESA:
            return state.map(d => {
                const despesa = action.despesa
                return (d.id === despesa.id) ? despesa : d
            })
        default:
            return state
    }
}

function despesa(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_DESPESA:
            return action.despesa
        case actionTypes.CHANGE_DESPESA:
            return Object.assign({}, state, { [action.field] : action.value })
        default:
            return state
    }
}

function despesaFilter(state = '', action) {
    switch (action.type) {
        case actionTypes.SEARCH_FILTER:
            return action.searchFilter
        default:
            return state
    }
}

export default combineReducers({ despesas, despesa, despesaFilter })

