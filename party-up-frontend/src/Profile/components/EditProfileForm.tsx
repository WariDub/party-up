import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import * as axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { JwtPayload } from '../../Auth/interfaces/jwt-payload.interface';
import { BACKEND_URL } from '../../globals';
import { EditUserDto } from '../dtos/edit-user.dto';
import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';
import User from '../models/user.model';

export interface EditProfileFormProps extends RouteComponentProps {
  user: User;
}

export interface EditProfileFormState {
  displayName: string;
  age: number;
  gender: Gender;
  favoriteGenre: Genre;
  favoriteRole: Role;
}

const EditProfileForm = class extends React.Component<EditProfileFormProps, EditProfileFormState> {
  constructor(props: EditProfileFormProps) {
    super(props);

    const { user } = props;

    this.state = {
      displayName: user.displayName,
      age: user.age,
      gender: user.gender,
      favoriteGenre: user.favoriteGenre,
      favoriteRole: user.favoriteRole,
    };
  }

  render(): JSX.Element {
    return (
      <Box m={1}>
        <Grid container justify="center">
          <Grid item xs={8}>
            {this.renderCard()}
          </Grid>
        </Grid>
      </Box>
    );
  }

  renderCard(): JSX.Element {
    return (
      <Card elevation={3}>
        <CardContent>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={10}>
              <Typography variant="h6">Profile</Typography>
            </Grid>
            {this.renderFieldDisplayName()}
            {this.renderQuestionAge()}
            {this.renderQuestionGender()}
            {this.renderQuestionFavoriteGenre()}
            {this.renderQuestionFavoriteRole()}
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Button size="medium" onClick={this.handleButtonOnClickSaveChanges}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }

  renderFieldDisplayName(): JSX.Element {
    const { displayName } = this.state;

    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <TextField
            variant="filled"
            label="Display Name"
            value={displayName}
            onChange={this.handleChangeDisplayName}
          />
        </FormControl>
      </Grid>
    );
  }

  renderQuestionAge(): JSX.Element {
    const { age } = this.state;

    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <TextField variant="filled" label="Age" value={age} onChange={this.handleChangeAge} />
        </FormControl>
      </Grid>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderFieldWithChoices(
    label: string,
    value: string | number,
    choices: { [key: string]: string | number },
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void
  ): JSX.Element {
    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <InputLabel>{label}</InputLabel>
          <Select value={value} onChange={onChange}>
            {Object.values(choices).map((choice) => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  renderQuestionGender(): JSX.Element {
    const { gender } = this.state;
    return this.renderFieldWithChoices('Gender', gender, Gender, this.handleChangeGender);
  }

  renderQuestionFavoriteGenre(): JSX.Element {
    const { favoriteGenre } = this.state;
    return this.renderFieldWithChoices(
      'Favorite Genre',
      favoriteGenre,
      Genre,
      this.handleChangeFavoriteGenre
    );
  }

  renderQuestionFavoriteRole(): JSX.Element {
    const { favoriteRole } = this.state;
    return this.renderFieldWithChoices(
      'Favorite Role',
      favoriteRole,
      Role,
      this.handleChangeFavoriteRole
    );
  }

  handleChangeDisplayName = (event: React.ChangeEvent<{ value: unknown }>): void => {
    let value = event.target.value as string;
    this.setState({ displayName: value });
  };

  handleChangeAge = (event: React.ChangeEvent<{ value: unknown }>): void => {
    let value = event.target.value as string;
    if (!value) {
      value = '0';
    }
    const age = parseInt(value, 10);
    if (isNaN(age)) {
      return;
    }
    this.setState({ age });
  };

  handleChangeGender = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as Gender;
    this.setState({ gender: value });
  };

  handleChangeFavoriteGenre = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as Genre;
    this.setState({ favoriteGenre: value });
  };

  handleChangeFavoriteRole = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as Role;
    this.setState({ favoriteRole: value });
  };

  handleButtonOnClickSaveChanges = async (): Promise<void> => {
    const { displayName, age, gender, favoriteGenre, favoriteRole } = this.state;
    if (typeof age !== 'number') {
      return console.error('age should be a number');
    }

    const data: EditUserDto = {
      displayName,
      age,
      gender,
      favoriteGenre,
      favoriteRole,
    };
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      return console.error('missing access token');
    }

    const payload: JwtPayload = jwtDecode.default(accessToken);
    const reqUrl = `${BACKEND_URL}/users/${payload.username}`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const user = await axios.default.patch(reqUrl, data, config);
      console.log(user);
      this.props.history.push('/');
    } catch (e) {
      console.error(e);
    }
  };
};

export default EditProfileForm;
