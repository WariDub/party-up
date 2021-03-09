import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box } from '@material-ui/core';
import * as axios from 'axios';
import { Game } from '../interfaces/Game';

export interface NavBarProps {
  onQueryResult: (data: Game[]) => void;
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
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6">PartyUp</Typography>
          <Box m={1} mx="auto">
            <TextField
              variant="filled"
              label="Enter game name"
              onChange={this.handleTextFieldOnChange}
              onKeyDown={this.handleTextFieldOnKeyDown}
            />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  handleTextFieldOnChange = (
    field: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    this.setState({ query: field.target.value });
  };

  handleTextFieldOnKeyDown = (event: any): void => {
    if (event.keyCode === 13) {
      this.didSubmitQuery();
    }
  };

  didSubmitQuery = async (): Promise<void> => {
    const { query } = this.state;
    const reqUrl = `http://localhost:3001/games?search=${query}`;
    // TODO: replace this hard coded access token with the one stored in cookies
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDNkNzIzNzNlMDkwZTE3NTQwYmI5NzkiLCJ1c2VybmFtZSI6InlkdWJ1YyIsImlhdCI6MTYxNTMyMDEyNiwiZXhwIjoxNjE1OTI0OTI2fQ.UHQVJXjJ0IzFhxbmqYeBw50pwx7Fr7HmW1rLfyIO_iQ`,
      },
    };

    try {
      const res = await axios.default.get(reqUrl, config);
      const { onQueryResult } = this.props;
      onQueryResult(res.data);
    } catch (e) {
      console.log(e);
    }
  };
};

export default NavBar;
