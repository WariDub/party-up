import React from 'react';
import GamesList from './components/games-list';
import NavBar from './components/nav-bar';
import { Game } from './interfaces/Game';

export interface SearchPageProps {
    
}
 
export interface SearchPageState {
    results: Game[]
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
    constructor(props: SearchPageProps) {
        super(props);

        this.state = {
            results: []
        }

        this.onQueryResult = this.onQueryResult.bind(this)
    }

    render() {
        return (
            <React.Fragment>
                <NavBar onUpdate={this.onQueryResult}/>
                <GamesList results={this.state.results}/>
            </React.Fragment>
        );
    }

    onQueryResult(data: Game[]) {
        this.setState({ results: data })
    }
}

export default SearchPage