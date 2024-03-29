import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedIn } from '../service/auth.service'

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => 
          isLoggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute