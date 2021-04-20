import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GamesList from './components/GamesList';
import NavBar from './components/NavBar';
import { Game } from './interfaces/Game';

export interface SearchPageProps extends RouteComponentProps {}

export interface SearchPageState {
  results: Game[] | null;
}

const SearchPage = class extends React.PureComponent<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      results: [],
    };
  }

  render(): JSX.Element {
    const { history, location, match } = this.props;
    const { results } = this.state;

    return (
      <>
        <NavBar
          history={history}
          location={location}
          match={match}
          showSearchBar
          onQueryResult={this.onQueryResult}
        />
        <GamesList history={history} location={location} match={match} results={results} />
      </>
    );
  }

  onQueryResult = (data: Game[] | null): void => {
    this.setState({ results: data });
  };
};

export default SearchPage;
