const despesasIniciais = [
    { id: 1, data: '21/10/2018', descricao: 'Almoco', valor: 20.0 },
    { id: 2, data: '20/10/2018', descricao: 'Uber', valor: 10.0 },
    { id: 3, data: '19/10/2018', descricao: 'Telesena', valor: 5.0 },
    { id: 4, data: '18/10/2018', descricao: 'Coxinha', valor: 3.0 }
]

export function getDespesa(id) {
    return despesasIniciais.find(d => d.id === id)
}

export function getDespesas() {
    return despesasIniciais
}