import { IsNotEmpty, IsString } from 'class-validator';

export class GetGamesFilterDto {
    @IsString()
    @IsNotEmpty()
    search: string;
}
