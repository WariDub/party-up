import { Box, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Game } from '../interfaces/Game';

export interface GamesListProps extends RouteComponentProps {
  results: Game[] | null;
}

export interface GamesListState {}

const GamesList = class extends React.PureComponent<GamesListProps, GamesListState> {
  render(): JSX.Element {
    const { results } = this.props;

    return (
      <Box p={1}>
        <GridList spacing={8} cellHeight="auto" cols={0}>
          {results?.map((result) => (
            <GridListTile key={result.id} onClick={this.handleGameOnClick}>
              <img src={this.getGameCoverUrl(result)} alt={result.name} id={result.id} />
              <GridListTileBar title={result.name} />
            </GridListTile>
          ))}
        </GridList>
      </Box>
    );
  }

  getGameCoverUrl = (result: Game): string => {
    const { cover } = result;
    if (!cover) {
      return '';
    }
    const { url } = cover;
    if (!url) {
      return '';
    }
    return url.replace('t_thumb', 't_cover_big');
  };

  handleGameOnClick = (event: any): void => {
    const { id } = event.target;
    const { history, results } = this.props;
    const game = results?.find((g) => g.id.toString() === id);

    if (game) {
      history.push('/ExperienceLevelPickerForm', { game });
    }
  };
};

export default GamesList;
