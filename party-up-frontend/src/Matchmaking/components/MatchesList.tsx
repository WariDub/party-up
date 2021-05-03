import { Box, Button, Card, CardContent, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Match from '../models/match.model';
import * as axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import User from '../../Profile/models/user.model';
import { BACKEND_URL } from '../../globals';
import { JwtPayload } from '../../Auth/interfaces/jwt-payload.interface';
import { UsersService } from '../../Profile/users.service';

export interface MatchesListProps extends RouteComponentProps {
  matches: Match[];
}

export interface MatchesListState {
  user: User | null;
}

const MatchesList = class extends React.PureComponent<MatchesListProps, MatchesListState> {
  usersService = new UsersService();

  constructor(props: MatchesListProps) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    await this.fetchAndSetUser();
  }

  render(): JSX.Element {
    const { matches } = this.props;
    const { user } = this.state;

    return (
      <Box p={2}>
        <GridList spacing={16} cellHeight="auto" cols={0}>
          {user
            ? matches.map((match) => (
                <GridListTile key={match.entry.user._id} onClick={this.handleMatchOnClick(match)}>
                  {this.renderMatch(match)}
                </GridListTile>
              ))
            : []}
        </GridList>
      </Box>
    );
  }

  renderMatch(match: Match): JSX.Element {
    const { user } = this.state;

    return (
      <Card>
        <CardContent>
          <h3>{match.entry.user.displayName}</h3>
          <h5>{`In-game: ${match.entry.identifier}`}</h5>
          <h5>{`${match.percentage}% match`}</h5>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleButtonOnClickToggleFriend(match)}
          >
            {user?.friends.includes(match.entry.user._id) ? 'Unfriend' : 'Add Friend'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  handleMatchOnClick = (param: Match) => (event: any): void => {
    console.log('match on click');
  };

  handleButtonOnClickToggleFriend = (param: Match) => (event: any): void => {
    const { user } = this.state;
    if (!user) {
      return;
    }

    const addFriend = !user.friends.includes(param.entry.user._id);

    if (addFriend) {
      user.friends.push(param.entry.user._id);
      event.target.innerHTML = 'Unfriend';
      this.usersService.addFriend(user.username, param.entry.user._id);
    } else {
      user.friends = user.friends.filter((friend) => friend != param.entry.user._id);
      event.target.innerHTML = 'Add Friend';
      this.usersService.deleteFriend(user.username, param.entry.user._id);
    }
  };

  fetchAndSetUser = async (): Promise<void> => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return console.error('missing access token');
    }

    const payload: JwtPayload = jwtDecode.default(accessToken);

    try {
      const user = await this.usersService.getUser(payload.uid);
      if (user) {
        this.setState({ user });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export default MatchesList;
