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

    this.getGameCoverUrl = this.getGameCoverUrl.bind(this);
  }

  render(): JSX.Element {
    const { results } = this.props;

    return (
      <Box p={1} width="80%">
        <GridList spacing={8} cellHeight="auto" cols={0}>
          {results.map((result) => (
            <GridListTile key={result.id}>
              <img src={this.getGameCoverUrl(result)} alt={result.name} />
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
};

export default GamesList;
