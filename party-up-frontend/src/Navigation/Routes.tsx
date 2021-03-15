import { Router, Switch, Route, Link } from 'react-router-dom'
import SearchPage from '../Search/SearchPage';
import {AuthenticationForm} from '../Auth/AuthenticationForm'
import {ProtectedRoute} from './ProtectedRoute'



export const Routes = (
    <Switch>
          <Route exact path="/AuthenticationForm" component={AuthenticationForm} />
          <ProtectedRoute exact path="/" component={SearchPage} />
        </Switch>
 );

 