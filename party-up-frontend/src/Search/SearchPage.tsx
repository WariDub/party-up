import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GamesList from './components/GamesList';
import NavBar from './components/NavBar';
import { Game } from './interfaces/Game';

export interface SearchPageProps extends RouteComponentProps {}

export interface SearchPageState {
  results: Game[];
}

const SearchPage = class extends React.PureComponent<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      results: [],
    };
  }

  render(): JSX.Element {
    const { results } = this.state;

    return (
      <>
        <NavBar onQueryResult={this.onQueryResult} />
        <GamesList
          results={results}
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        />
      </>
    );
  }

  onQueryResult = (data: Game[]): void => {
    this.setState({ results: data });
  };
};

export default SearchPage;
