import React from 'react';
import { Game } from '../interfaces/Game';

export interface GamesListProps {
    results: Game[]
}
 
export interface GamesListState {
    
}
 
class GamesList extends React.Component<GamesListProps, GamesListState> {
    render() { 
        return (
            <div>
                {this.props.results.map((result, index) => (
                    <p key={index}>{result.name}</p>
                ))}
            </div>
        );
    }
}
 
export default GamesList;