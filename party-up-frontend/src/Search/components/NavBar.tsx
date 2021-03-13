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

    this.handleTextFieldOnChange = this.handleTextFieldOnChange.bind(this);
    this.handleTextFieldOnKeyDown = this.handleTextFieldOnKeyDown.bind(this);
    this.didSubmitQuery = this.didSubmitQuery.bind(this);
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

  handleTextFieldOnChange(field: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    this.setState({ query: field.target.value });
  }

  handleTextFieldOnKeyDown(event: any): void {
    if (event.keyCode === 13) {
      this.didSubmitQuery();
    }
  }

  async didSubmitQuery(): Promise<void> {
    const { query } = this.state;
    const reqUrl = `http://localhost:3001/games?search=${query}`;
    // TODO: replace this hard coded access token with the one stored in cookies
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      const res = await axios.default.get(reqUrl, config);
      const { onQueryResult } = this.props;
      onQueryResult(res.data);
    } catch (e) {
      console.log(e);
    }
  }
};

export default NavBar;
