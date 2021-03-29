import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from '../Search/components/NavBar';
import MatchesList from './components/MatchesList';
import Match from './models/match.model';

export interface MatchmakingPageProps extends RouteComponentProps {}

export interface MatchmakingPageState {
  matches: Match[];
}

const MatchmakingPage = class extends React.Component<MatchmakingPageProps, MatchmakingPageState> {
  constructor(props: MatchmakingPageProps) {
    super(props);

    const { matches } = props.location.state as MatchmakingPageState;
    this.state = {
      matches: matches,
    };

    console.log(matches);
  }

  render(): JSX.Element {
    const { history, location, match } = this.props;
    const { matches } = this.state;

    return (
      <>
        <NavBar
          history={history}
          location={location}
          match={match}
          showSearchBar={false}
          onQueryResult={null}
        />
        <MatchesList history={history} location={location} match={match} matches={matches} />
      </>
    );
  }
};

export default MatchmakingPage;
