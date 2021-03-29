import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, Button, Grid } from '@material-ui/core';
import * as axios from 'axios';
import { Game } from '../interfaces/Game';
import { BACKEND_URL } from '../../globals';
import { RouteComponentProps } from 'react-router-dom';
import { Auth } from '../../Auth/auth.api';

export interface NavBarProps extends RouteComponentProps {
  showSearchBar: boolean;
  onQueryResult: ((data: Game[]) => void) | null;
}

export interface NavBarState {
  query: string;
}

const NavBar = class extends React.PureComponent<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      query: '',
    };
  }

  render(): JSX.Element {
    const { showSearchBar } = this.props;

    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6">PartyUp</Typography>
          {showSearchBar ? this.renderSearchBar() : null}
          <Grid justify="flex-end">
            <Button onClick={this.didClickButtonProfile}>Profile</Button>
          </Grid>
          <Grid justify="flex-end">
            <Button onClick={this.didClickButtonLogout}>Logout</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }

  renderSearchBar(): JSX.Element {
    return (
      <Box m={1} mx="auto">
        <TextField
          variant="filled"
          label="Enter game name"
          onChange={this.handleSearchBarOnChange}
          onKeyDown={this.handleSearchBarOnKeyDown}
        />
      </Box>
    );
  }

  handleSearchBarOnChange = (
    field: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    this.setState({ query: field.target.value });
  };

  handleSearchBarOnKeyDown = (event: any): void => {
    if (event.keyCode === 13) {
      this.didSubmitQuery();
    }
  };

  didSubmitQuery = async (): Promise<void> => {
    const { query } = this.state;
    const reqUrl = `${BACKEND_URL}/games?search=${query}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      const res = await axios.default.get(reqUrl, config);
      const { onQueryResult } = this.props;
      if (onQueryResult) {
        onQueryResult(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  didClickButtonProfile = (): void => {
    this.props.history.push('/ProfilePage');
  };

  didClickButtonLogout = (): void => {
    Auth.getInstance().onLogout();
    this.props.history.push('/AuthenticationForm');
  };
};

export default NavBar;
