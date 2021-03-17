import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import * as axios from 'axios';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BACKEND_URL } from '../../globals';
import { Game } from '../../Search/interfaces/Game';
import CreateMatchmakingEntryDto from '../dtos/create-matchmaking-entry.dto';
import Experience from '../enums/experience.enum';

export interface ExperienceLevelPickerFormProps extends RouteComponentProps {}

export interface ExperienceLevelPickerFormState {
  game?: Game;
  experience: Experience;
}

const ExperienceLevelPickerForm = class extends React.Component<
  ExperienceLevelPickerFormProps,
  ExperienceLevelPickerFormState
> {
  constructor(props: ExperienceLevelPickerFormProps) {
    super(props);

    const { game } = props.location.state as ExperienceLevelPickerFormState;
    this.state = {
      game: game,
      experience: Experience.BEGINNER,
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
              <Typography variant="h6">How experienced are you?</Typography>
              {this.renderRadioButtons()}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <Button onClick={this.handleButtonOnClickMatchmake}>Matchmake</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }

  renderRadioButtons(): JSX.Element {
    const { experience } = this.state;

    return (
      <RadioGroup value={experience} onChange={this.handleOnChangeExperience}>
        <FormControlLabel
          value={Experience.BEGINNER}
          control={<Radio />}
          label={Experience.BEGINNER}
        />
        <FormControlLabel
          value={Experience.INTERMEDIATE}
          control={<Radio />}
          label={Experience.INTERMEDIATE}
        />
        <FormControlLabel
          value={Experience.ADVANCED}
          control={<Radio />}
          label={Experience.ADVANCED}
        />
      </RadioGroup>
    );
  }

  handleOnChangeExperience = (event: any): void => {
    const value = event.target.value as Experience;
    this.setState({ experience: value });
  };

  handleButtonOnClickMatchmake = async (): Promise<void> => {
    const { game } = this.state;
    if (!game) {
      return console.error('must provide a game when creating component');
    }
    const { experience } = this.state;
    const data: CreateMatchmakingEntryDto = {
      game,
      experience,
    };

    const reqUrl = `${BACKEND_URL}/matchmaking`;
    const config: axios.AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    try {
      const res = await axios.default.post(reqUrl, data, config);
      this.props.history.push('/MatchmakingPage', { matches: res.data });
    } catch (e) {
      console.error(e);
    }
  };
};

export default ExperienceLevelPickerForm;
