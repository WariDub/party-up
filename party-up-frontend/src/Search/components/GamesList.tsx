import { Box, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import React from 'react';
import { Game } from '../interfaces/Game';

export interface GamesListProps {
  results: Game[];
}

export interface GamesListState {}

const GamesList = class extends React.PureComponent<GamesListProps, GamesListState> {
  constructor(props: GamesListProps) {
    super(props);

    this.handleGameOnClick = this.handleGameOnClick.bind(this);
  }

  render(): JSX.Element {
    const { results } = this.props;

    return (
      <Box p={1}>
        <GridList spacing={8} cellHeight="auto" cols={0}>
          {results.map((result) => (
            <GridListTile key={result.id} onClick={this.handleGameOnClick}>
              <img src={this.getGameCoverUrl(result)} alt={result.name} id={result.id} />
              <GridListTileBar title={result.name} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getGameCoverUrl(result: Game): string {
    const { cover } = result;
    if (!cover) {
      return '';
    }
    const { url } = cover;
    if (!url) {
      return '';
    }
    return url.replace('t_thumb', 't_cover_big');
  }

  handleGameOnClick(event: any): void {
    const { id } = event.target;
    const { results } = this.props;
    const game = results.find((g) => g.id.toString() === id);

    if (game) {
      console.log(game);
      // TODO: navigate to select skill level page
    }
  }
};

export default GamesList;
