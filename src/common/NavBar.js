import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'

import { isLoggedIn, addLoginHandler } from '../service/auth.service'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isToggleOn: false
        }
    }

    showDropdown(e) {
        e.preventDefault();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    componentDidMount() {
        addLoginHandler((isLoggedIn, user) => this.setState({ user: user }))
    }

    render() {
        const classDropdownMenu = 'dropdown-menu' + (this.state.isToggleOn ? ' show' : '')
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Controle de Despesas</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/despesas" className="nav-link">Despesas</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/balancofinanceiro" className="nav-link">Balanço Financeiro</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" 
                                onClick={(e) => this.showDropdown(e)}
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className={classDropdownMenu} aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/">Action</Link>
                                <Link className="dropdown-item" to="/">Another action</Link>
                            </div>
                        </li>


                    </ul>
                    {isLoggedIn() && <Logout />}
                </div>
            </nav>
        )
    }

}

export default NavBar