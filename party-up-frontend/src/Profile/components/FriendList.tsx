import { Box, Button, Card, CardContent, Grid, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import User from '../models/user.model';
import { UsersService } from '../users.service';

export interface FriendListProps {
  user: User | null;
  friends: User[];
}

export interface FriendListState {}

class FriendList extends React.Component<FriendListProps, FriendListState> {
  usersService = new UsersService();

  constructor(props: FriendListProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Box m={1}>
        <Grid container justify="center">
          <Grid item xs={8}>
            {this.renderFriends()}
          </Grid>
        </Grid>
      </Box>
    );
  }

  renderFriends(): JSX.Element {
    const { friends } = this.props;

    return (
      <GridList spacing={8} cellHeight="auto" cols={0}>
        {friends.map((friend) => (
          <GridListTile key={friend._id}>{this.renderFriend(friend)}</GridListTile>
        ))}
      </GridList>
    );
  }

  renderFriend(friend: User): JSX.Element {
    const { user } = this.props;

    return (
      <Card>
        <CardContent>
          <h3>{friend.displayName}</h3>
          <h5>{`@${friend.username}`}</h5>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleButtonOnClickToggleFriend(friend)}
          >
            {user?.friends.includes(friend._id) ? 'Unfriend' : 'Add Friend'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  handleButtonOnClickToggleFriend = (param: User) => (event: any): void => {
    console.log(event);

    const { user } = this.props;
    if (!user) {
      return;
    }

    const addFriend = !user.friends.includes(param._id);

    if (addFriend) {
      user.friends.push(param._id);
      event.target.innerHTML = 'Unfriend';
      this.usersService.addFriend(user.username, param._id);
    } else {
      user.friends = user.friends.filter((friend) => friend != param._id);
      event.target.innerHTML = 'Add Friend';
      this.usersService.deleteFriend(user.username, param._id);
    }
  };
}

export default FriendList;
