import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import { logout } from '../service/auth.service'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = { redirect: false }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(event) {
        event.preventDefault()
        this.setState({ redirect: true })
        logout()
    }

    render() {
        console.log(`redirect ${this.state.redirect}`)
        if (this.state.redirect) return <Redirect to="/" />
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/despesas" className="nav-link" onClick={this.handleLogout}>Sair</Link>
                </li>
            </ul>
        )
    }
}

export default Logout