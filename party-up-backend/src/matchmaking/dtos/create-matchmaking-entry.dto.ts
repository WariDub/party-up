import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Game } from '../../games/interfaces/game.interface';
import { Experience } from '../enums/experience.enum';

export class CreateMatchmakingEntryDto {
    @IsNotEmpty()
    readonly game: Game;

    @IsNotEmpty()
    @IsString()
    readonly identifier: string;

    @IsNotEmpty()
    @IsEnum(Experience)
    readonly experience: Experience;
}
