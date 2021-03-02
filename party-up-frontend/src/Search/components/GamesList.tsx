import { Box, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
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
            <Box p={1} mx="auto" width="75%">
                <GridList spacing={8} cols={3}>
                    {this.props.results.map((result) => (
                        <GridListTile key={result.id} cols={1}>
                        <img src={result.cover.url.replace('t_thumb', 't_720p')} alt={result.name} />
                        <GridListTileBar title={result.name}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Box>
        );
    }
}
 
export default GamesList;