import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {Auth} from '../Auth/auth.api'



export const ProtectedRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={(props) => (
        Auth.getInstance().getAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/AuthenticationForm' />
    )} />
  )
