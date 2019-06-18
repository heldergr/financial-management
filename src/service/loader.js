import store from '../redux/store'
import { despesas as actionDespesas } from '../redux/actions'
import despesasAPI from '../api/despesa.api'

export const loadDespesas = () => {
    despesasAPI.findAll()
        .then(response => response.json())
        .then(despesas => store.dispatch(actionDespesas(despesas)))
        .catch(error => console.log(`Erro ao carregar despesas`))
}