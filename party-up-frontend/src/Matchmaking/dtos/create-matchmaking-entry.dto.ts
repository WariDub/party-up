import { Game } from '../../Search/interfaces/Game';
import Experience from '../enums/experience.enum';

interface CreateMatchmakingEntryDto {
  readonly game: Game;
  readonly identifier: string;
  readonly experience: Experience;
}

export default CreateMatchmakingEntryDto;
