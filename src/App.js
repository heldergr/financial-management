import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './common/NavBar'
import Despesas from './components/Despesas'
import Despesa from './components/Despesa'
import Login from './auth/Login'

import PrivateRoute from './auth/PrivateRoute'

// const a1 = [1, 2, 3]

// const a2 = [a1]
// console.log(`a2[0] = ${a2[0]}`)
// console.log(`a2[1] = ${a2[1]}`)

// const a3 = [...a1]
// console.log(`a3[0] = ${a3[0]}`)
// console.log(`a3[1] = ${a3[1]}`)

// const name = 'id'
// const value = 4

// this.setState(
//   (state, props) => {
//     const despesa = Object.assign({}, state.despesa)
//     despesa[name] = value
//     return {
//       despesa: despesa
//     }
//   }
// )

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/despesas" component={Despesas} />
        <Route path="/despesas/:idDespesa" component={Despesa} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/balancofinanceiro" component={BalancoFinanceiro} />
      </div>
    </BrowserRouter>
  )
}

export default App;

function Home(props) {
  return (
    <div>
      Controle de despesas pessoal
    </div>
  )
}

function BalancoFinanceiro(props) {
  return (
    <div>
      Balanço Financeiro
    </div>
  )
}
