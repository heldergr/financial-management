const newDespesa = {
    id: undefined,
    data: '',
    descricao: '',
    valor: ''
}

const filterDespesas = (despesas, filter) => {
    if (filter && filter.length > 2) {
        return despesas.filter(despesa => despesa.descricao.startsWith(filter))
    } else {
        return despesas
    }
}

export const getDespesas = (state) => filterDespesas(state.despesas, state.despesaFilter)

export const getDespesa = (state, id) => {
    let despesa = getDespesas(state).find(despesa => despesa.id === id)
    if (!despesa) {
        despesa = newDespesa
    }
    return despesa
}