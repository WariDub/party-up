import { Box, Card, CardContent, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Match from '../models/match.model';

export interface MatchesListProps extends RouteComponentProps {
  matches: Match[];
}

export interface MatchesListState {}

const MatchesList = class extends React.PureComponent<MatchesListProps, MatchesListState> {
  render(): JSX.Element {
    const { matches } = this.props;

    return (
      <Box p={1}>
        <GridList spacing={8} cellHeight="auto" cols={0}>
          {matches.map((match) => (
            <GridListTile key={match.entry.user._id} onClick={this.handleMatchOnClick}>
              {this.renderMatch(match)}
            </GridListTile>
          ))}
        </GridList>
      </Box>
    );
  }

  renderMatch(match: Match): JSX.Element {
    return (
      <Card>
        <CardContent>
          <h3>{match.entry.user.displayName}</h3>
          <h5>{`@${match.entry.user.username}`}</h5>
          <h5>{`${match.percentage}% match`}</h5>
        </CardContent>
      </Card>
    );
  }

  handleMatchOnClick = (event: any): void => {
    console.log('match on click');
  };
};

export default MatchesList;
