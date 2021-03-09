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
import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';

export interface EditProfileFormProps {}

export interface EditProfileFormState {
  age: number;
  gender: Gender;
  favoriteGenre: Genre;
  favoriteRole: Role;
}

const EditProfileForm = class extends React.Component<EditProfileFormProps, EditProfileFormState> {
  constructor(props: EditProfileFormProps) {
    super(props);

    this.state = {
      age: 0,
      gender: Gender.OTHER,
      favoriteGenre: Genre.ACTION,
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
    const { age, gender, favoriteGenre, favoriteRole } = this.state;
    console.log(age, gender, favoriteGenre, favoriteRole);
    // TODO: connect to backend to save user profile
  };
};

export default EditProfileForm;
