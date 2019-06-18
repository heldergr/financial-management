import React from 'react'
import Title from '../common/Title'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import despesaAPI from '../api/despesa.api'
import { deleteDespesa, setDespesa } from '../redux/actions'
import DespesaFilter from './DespesaFilter'
import { getDespesas } from '../redux/selectors'

const newDespesa = { id: -1, data: '', descricao: '', valor: 0 }

class Despesas extends React.Component {

    constructor(props) {
        super(props)
        this.state = { toDespesa: false, id: null }
        this.handleDelete = this.handleDelete.bind(this)
        this.renderDespesa = this.renderDespesa.bind(this)
        this.handleClickDespesa = this.handleClickDespesa.bind(this)
    }

    handleDelete(despesa) {
        if (window.confirm(`Tem certeza que deseja remover a despesa ${despesa.descricao} ?`)) {
            despesaAPI.delete(despesa)
                .then(response => response.json())
                .then(despesa => this.props.deleteDespesa(despesa))
        }
    }

    handleClickDespesa(event, despesa = newDespesa) {
        event.preventDefault()
        this.props.setDespesa(despesa)
        this.setState( { id: despesa.id, toDespesa: true })
    }

    renderDespesa(despesa) {
        return (
            <tr key={despesa.id}>
                <th scope="row"><a href="/" onClick={(e) => this.handleClickDespesa(e, despesa)}>{despesa.id}</a></th>
                <td>{despesa.data}</td>
                <td>{despesa.descricao}</td>
                <td>{despesa.valor}</td>
                <td><button onClick={(e) => this.handleDelete(despesa)} className="btn btn-danger">Remover</button></td>
            </tr>
        )
    }

    render() {
        const despesas = this.props.despesas.map(this.renderDespesa)

        if (this.state.toDespesa) {
            return <Redirect to={`/despesas/${this.state.id}`} />
        }

        return (
            <React.Fragment>
                <Title value="Despesas pessoais" />
                <div className="row">
                    <a href="/" className="btn btn-success btn-sm" onClick={(e) => this.handleClickDespesa(e)}>Nova Despesa</a>
                </div>
                <div className="row" style={{ paddingTop: "15px"}}>
                    <DespesaFilter />
                </div>
                <div className="row" style={{ paddingTop: "15px"}}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Data</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Valor</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {despesas}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ despesas: getDespesas(state) })
const mapDispatchToActions = { deleteDespesa, setDespesa }

export default connect(mapStateToProps, mapDispatchToActions)(Despesas)