import React from 'react'
import { connect } from 'react-redux'
import { changeSearchFilter } from '../redux/actions'

class DespesaFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange(event) {
        const value = event.target.value
        this.props.changeSearchFilter(value)
    }

    render() {
        return (
            <React.Fragment>
                <span style={{ paddingRight: "5px" }}>Despesa:</span>
                <input type="text" value={this.props.searchFilter} onChange={this.handleFilterChange} />
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({ searchFilter: state.despesaFilter }),
    { changeSearchFilter }
)(DespesaFilter)