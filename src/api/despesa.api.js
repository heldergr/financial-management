const despesasIniciais = [
    { id: 1, data: '21/10/2018', descricao: 'Almoco', valor: 20.0 },
    { id: 2, data: '20/10/2018', descricao: 'Uber', valor: 10.0 },
    { id: 3, data: '19/10/2018', descricao: 'Telesena', valor: 5.0 },
    { id: 4, data: '18/10/2018', descricao: 'Coxinha', valor: 3.0 }
]

const gravarLocal = (despesas) => localStorage.setItem('despesas', JSON.stringify(despesas))

let despesas
const localItem = localStorage.getItem('despesas')
if (localItem !== null && localItem !== undefined) {
    despesas = JSON.parse(localItem)
} else {
    gravarLocal(despesasIniciais)
    despesas = despesasIniciais
}

class Response {
    constructor(json, status) {
        this._json = json
        this._ok = status >= 200 && status < 300
        this._status = status
    }

    json() {
        return this._json
    }

    get ok() {
        return this._ok
    }

    get status() {
        return this._status
    }
}

class DespesaAPI {
    async findAll() {
        return new Promise(
            (resolve, reject) => {
                resolve(new Response(despesas, 200))
            }
        )
    }

    async findById(id) {
        const despesa = despesas.find(d => d.id === id)
        return new Promise(
            (resolve, reject) => {
                if (despesa !== undefined && despesa !== null) {
                    resolve(new Response(despesa, 200))
                } else {
                    reject(`Nao foi encontrada despesa com id ${id}`)
                }
            }
        )
    }

    async create(despesa) {
        despesa.id = despesas.map(d => d.id).reduce((prev, curr) => Math.max(prev, curr)) + 1
        despesas.push(despesa)
        gravarLocal(despesas)
        return new Promise(
            (resolve, reject) => {
                resolve(new Response(despesa, 201))
            }
        )
    }

    async update(despesa) {
        const currIndex = despesas.findIndex(d => d.id === despesa.id)
        despesas[currIndex] = despesa
        gravarLocal(despesas)
        return new Promise(
            (resolve, reject) => {
                if (currIndex > -1) {
                    resolve(new Response(despesa, 204))
                } else {
                    reject(`Nao foi encontrada despesa com id ${despesa.id}`)
                }
            }
        )
    }

    async delete(despesa) {
        const currIndex = despesas.findIndex(d => d.id === despesa.id)
        despesas.splice(currIndex, 1)
        gravarLocal(despesas)
        return new Promise(
            (resolve, reject) => {
                if (currIndex > -1) {
                    resolve(new Response(despesa, 204))
                } else {
                    reject(`Nao foi encontrada despesa com id ${despesa.id}`)
                }
            }
        )
    }
}

const despesaAPI = new DespesaAPI()

export default despesaAPI
