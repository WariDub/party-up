import { Router, Switch, Route, Link } from 'react-router-dom';
import SearchPage from '../Search/SearchPage';
import { AuthenticationForm } from '../Auth/AuthenticationForm';
import { ProtectedRoute } from './ProtectedRoute';
import ExperienceLevelPickerForm from '../Matchmaking/components/ExperienceLevelPickerForm';
import MatchmakingPage from '../Matchmaking/MatchmakingPage';

export const Routes = (
  <Switch>
    <Route exact path="/AuthenticationForm" component={AuthenticationForm} />
    <ProtectedRoute exact path="/ExperienceLevelPickerForm" component={ExperienceLevelPickerForm} />
    <ProtectedRoute exact path="/MatchmakingPage" component={MatchmakingPage} />
    <ProtectedRoute exact path="/" component={SearchPage} />
  </Switch>
);
