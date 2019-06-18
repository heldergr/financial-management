import { actionTypes } from './actionTypes'

export const despesas = (despesas) => ({ type: actionTypes.DESPESAS, despesas })
export const deleteDespesa = (despesa) => ({ type: actionTypes.DELETE_DESPESA, despesa })
export const createDespesa = (despesa) => ({ type: actionTypes.CREATE_DESPESA, despesa })
export const updateDespesa = (despesa) => ({ type: actionTypes.UPDATE_DESPESA, despesa })

export const setDespesa = (despesa) => ({ type: actionTypes.SET_DESPESA, despesa })
export const changeDespesa = (field, value) => ({ type: actionTypes.CHANGE_DESPESA, field, value })

export const changeSearchFilter = (searchFilter) => ({ type: actionTypes.SEARCH_FILTER, searchFilter })