import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetGamesFilterDto } from './dtos/get-games-filter.dto';
import { GamesService } from './games.service';
import { Game } from './interfaces/game.interface';

@Controller('games')
@UseGuards(AuthGuard())
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    async getGames(@Query(ValidationPipe) getGamesFilterDto: GetGamesFilterDto): Promise<Game[]> {
        return this.gamesService.getGames(getGamesFilterDto);
    }
}
