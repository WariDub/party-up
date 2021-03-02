import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box } from '@material-ui/core';
import * as axios from 'axios';
import { Game } from '../interfaces/Game';


export interface NavBarProps {
    onUpdate: (data: Game[]) => void
}
 
export interface NavBarState {
    query: string;
}
 
class NavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props)

        this.state = {
            query: ''
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleTextFieldOnChange = this.handleTextFieldOnChange.bind(this);
        this.didSubmitQuery = this.didSubmitQuery.bind(this);
    }

    render() { 
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6">
                        PartyUp
                    </Typography>
                    <Box m={1}>
                        <TextField
                            variant="filled"
                            label="Enter game name"
                            onChange={this.handleTextFieldOnChange}
                            onKeyDown={this.onKeyPress}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }

    handleTextFieldOnChange(field: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({ query: field.target.value })
    }

    onKeyPress(event: any){
      if(event.keyCode == 13){
         this.didSubmitQuery()
      }
   }

    async didSubmitQuery() {
        const { query } = this.state;
        
        const reqUrl = `http://localhost:3001/games?search=${query}`;
        const config = {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDNkNzIzNzNlMDkwZTE3NTQwYmI5NzkiLCJ1c2VybmFtZSI6InlkdWJ1YyIsImlhdCI6MTYxNDY1MzY5NywiZXhwIjoxNjE1MjU4NDk3fQ.m0yN4z6dUs9BuyUMi7vMM3Suq2ECAJh_Q2tQi44dv9U`,
            },
        };

        try {
            const res = await axios.default.get(reqUrl, config);
            this.props.onUpdate(res.data);
        } catch (e) {
            console.log(e);
        }
    }
}

export default NavBar;