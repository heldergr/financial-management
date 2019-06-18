import React from 'react'
import { Redirect } from 'react-router-dom'

import { login } from '../service/auth.service'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { username: '', password: '', message: '', redirectToReferrer: false }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleLogin(event) {
        event.preventDefault()
        const { username, password } = this.state
        if (username === "admin" && password === "admin") {
            login();
            this.setState({
                redirectToReferrer: true
            })
        } else {
            this.setState({ message: 'Usuario invalido!' })
        }
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div style={{marginTop: "15px"}}>
                { this.state.message && 
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                }
                <form>
                    <div className="form-group">
                        <label htmlFor="id_username">Username</label>
                        <input type="text" name="username" className="form-control" id="id_username" 
                            onChange={this.handleInputChange} placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id_password">Password</label>
                        <input type="password" name="password" className="form-control" id="id_password" 
                        onChange={this.handleInputChange} placeholder="Password" />
                    </div>

                    <button className="btn btn-primary btn-sm" onClick={this.handleLogin}>Login</button>
                </form>
            </div>
        )
    }
}

export default Login
