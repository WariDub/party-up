import { Box, Card, CardContent, Grid, GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import User from '../models/user.model';

export interface FriendListProps {
  friends: User[];
}

export interface FriendListState {}

class FriendList extends React.Component<FriendListProps, FriendListState> {
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
    return (
      <Card>
        <CardContent>
          <h3>{friend.displayName}</h3>
          <h5>{`@${friend.username}`}</h5>
        </CardContent>
      </Card>
    );
  }
}

export default FriendList;
