import React from 'react'
import { Redirect } from 'react-router-dom'
import Title from '../common/Title'
import { connect } from 'react-redux'
import despesaAPI from '../api/despesa.api'
import { createDespesa, updateDespesa, changeDespesa } from '../redux/actions'

class Despesa extends React.Component {

    constructor(props) {
        super(props)
        this.state = { toList: false }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.props.changeDespesa(name, value)
    }

    handleCancel(event) {
        event.preventDefault()
        this.setState({ toList: true })
    }

    getSaveAPI() {
        return (this.props.despesa.id !== -1) ? despesaAPI.update : despesaAPI.create
    }

    getSaveAction() {
        return (this.props.despesa.id !== -1) ? this.props.updateDespesa : this.props.createDespesa
    }

    handleSave(event) {
        event.preventDefault()
        const despesa = this.props.despesa
        const saveAPI = this.getSaveAPI()
        saveAPI(despesa)
            .then(response => {
                this.setState({ toList: true })
                const saveAction = this.getSaveAction()
                saveAction(despesa)
            }).catch(error => `Erro ao salvar despesa ${error}`)
    }

    render() {
        if (this.state.toList) {
            return <Redirect to="/despesas" />
        }
        return (
            <div>
                <Title value="Despesa" />
                <form >
                    <div className="form-group row">
                        <label htmlFor="id_data" className="col-sm-2 col-form-label">Data</label>
                        <div className="col-sm-10">
                            <input type="text" name="data" value={this.props.despesa.data} onChange={this.handleInputChange}
                                className="form-control" id="id_data" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="id_descricao" className="col-sm-2 col-form-label">Descrição</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="descricao"
                                value={this.props.despesa.descricao} onChange={this.handleInputChange} id="id_descricao" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="id_valor" className="col-sm-2 col-form-label">Valor</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="valor" value={this.props.despesa.valor}
                                onChange={this.handleInputChange} id="id_valor" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button className="btn btn-primary" onClick={this.handleCancel}>Cancelar</button> <button className="btn btn-primary" onClick={this.handleSave}>Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProperties = (state) => {
    const { despesa } = state
    return { despesa }
}
const mapDispatchToActions = { createDespesa, updateDespesa, changeDespesa }
export default connect(mapStateToProperties, mapDispatchToActions)(Despesa)