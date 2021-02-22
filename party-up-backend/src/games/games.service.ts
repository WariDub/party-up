import { Injectable } from '@nestjs/common';
import { GetGamesFilterDto } from './dtos/get-games-filter.dto';
import { Game } from './interfaces/game.interface';
import * as axios from 'axios';

@Injectable()
export class GamesService {
    async getGames(getGamesFilterDto: GetGamesFilterDto): Promise<Game[]> {
        const { search } = getGamesFilterDto;
        const reqUrl = `https://api.igdb.com/v4/games?search=${search}&fields=name,rating,genres.*,cover.*`;
        const config = {
            headers: {
                'Client-ID': `${process.env.IGDB_CLIENT_ID}`,
                Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
            },
        };

        try {
            const res = await axios.default.get(reqUrl, config);
            const games: Game[] = JSON.parse(JSON.stringify(res.data));
            return games;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
