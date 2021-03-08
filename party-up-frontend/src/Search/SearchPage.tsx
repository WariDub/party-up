import React from 'react';
import GamesList from './components/GamesList';
import NavBar from './components/NavBar';
import { Game } from './interfaces/Game';

export interface SearchPageProps {}

export interface SearchPageState {
  results: Game[];
}

const SearchPage = class extends React.PureComponent<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      results: [],
    };

    this.onQueryResult = this.onQueryResult.bind(this);
  }

  render(): JSX.Element {
    const { results } = this.state;

    return (
      <>
        <NavBar onQueryResult={this.onQueryResult} />
        <GamesList results={results} />
      </>
    );
  }

  onQueryResult(data: Game[]): void {
    this.setState({ results: data });
  }
};

export default SearchPage;
