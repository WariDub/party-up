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
import React from 'react';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';

export interface EditProfileFormProps {}

export interface EditProfileFormState {
  age: number;
  favoriteGenre: Genre;
  favoriteRole: Role;
}

const EditProfileForm = class extends React.Component<EditProfileFormProps, EditProfileFormState> {
  constructor(props: EditProfileFormProps) {
    super(props);

    this.state = {
      age: 0,
      favoriteGenre: Genre.Action,
      favoriteRole: Role.DPS,
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
            {this.renderQuestionAge()}
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

  renderQuestionAge(): JSX.Element {
    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <TextField variant="filled" label="Age" onChange={this.handleChangeAge} />
        </FormControl>
      </Grid>
    );
  }

  handleChangeAge = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as number;
    if (value > 0) {
      this.setState({ age: value });
    }
  };

  renderQuestionFavoriteGenre(): JSX.Element {
    const { favoriteGenre } = this.state;
    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <InputLabel>Favorite Genre</InputLabel>
          <Select value={favoriteGenre} onChange={this.handleChangeFavoriteGenre}>
            {Object.values(Genre).map((genre) => (
              <MenuItem value={genre}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  handleChangeFavoriteGenre = (event: React.ChangeEvent<{ value: unknown }>): void => {
    this.setState({ favoriteGenre: event.target.value as Genre });
  };

  renderQuestionFavoriteRole(): JSX.Element {
    const { favoriteRole } = this.state;
    return (
      <Grid item xs={10}>
        <FormControl fullWidth variant="filled">
          <InputLabel>Favorite Role</InputLabel>
          <Select value={favoriteRole} onChange={this.handleChangeFavoriteRole}>
            {Object.values(Role).map((role) => (
              <MenuItem value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  handleChangeFavoriteRole = (event: React.ChangeEvent<{ value: unknown }>): void => {
    this.setState({ favoriteRole: event.target.value as Role });
  };

  handleButtonOnClickSaveChanges = () => {
    const { age, favoriteGenre, favoriteRole } = this.state;
    console.log(age, favoriteGenre, favoriteRole);
  };
};

export default EditProfileForm;
