import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export interface NavBarProps {}

export interface NavBarState {}

const NavBar = class extends React.PureComponent<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {};
  }

  render(): JSX.Element {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6">PartyUp</Typography>
        </Toolbar>
      </AppBar>
    );
  }
};

export default NavBar;
