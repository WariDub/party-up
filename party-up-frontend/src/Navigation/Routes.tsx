import { Router, Switch, Route, Link } from 'react-router-dom';
import SearchPage from '../Search/SearchPage';
import { AuthenticationForm } from '../Auth/AuthenticationForm';
import { ProtectedRoute } from './ProtectedRoute';
import ExperienceLevelPickerForm from '../Matchmaking/components/ExperienceLevelPickerForm';

export const Routes = (
  <Switch>
    <Route exact path="/AuthenticationForm" component={AuthenticationForm} />
    <Route exact path="/ExperienceLevelPickerForm" component={ExperienceLevelPickerForm} />
    <ProtectedRoute exact path="/" component={SearchPage} />
  </Switch>
);
