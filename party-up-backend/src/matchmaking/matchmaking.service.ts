import { Injectable } from '@nestjs/common';
import { Gender } from '../users/enums/gender.enum';
import { Genre } from '../users/enums/genre.enum';
import { Role } from '../users/enums/role.enum';
import { User } from '../users/models/user.model';
import { CreateMatchmakingEntryDto } from './dtos/create-matchmaking-entry.dto';
import { Experience } from './enums/experience.enum';
import { Match } from './models/match.model';
import { MatchmakingEntry } from './models/matchmaking-entry.model';

@Injectable()
export class MatchmakingService {
    private matchmakings: { [key: string]: MatchmakingEntry[] } = {};

    constructor() {
        this.generateDummyEntries();
        // TODO: make a function that loops every few minutes to clear old entries
    }

    async createMatchmakingEntry(
        user: User,
        createMatchmakingEntryDto: CreateMatchmakingEntryDto,
    ): Promise<Match[]> {
        const { game, experience } = createMatchmakingEntryDto;
        const entries = this.matchmakings[game.id];
        if (!entries) {
            this.matchmakings[game.id] = [];
        }
        const matches: Match[] = [];

        for (const entry of entries) {
            // skip entries that are for this user
            if (entry.user.getId() === user.getId()) {
                continue;
            }
            const match = new Match();
            match.entry = entry;
            match.percentage = this.calculateMatchPercentage(user, entry);
            matches.push(match);
        }

        const newEntry = new MatchmakingEntry();
        newEntry.user = user;
        newEntry.experience = experience;
        newEntry.createdAt = Date.now();
        this.matchmakings[game.id].push(newEntry);

        return matches;
    }

    private calculateMatchPercentage(matchUser: User, entry: MatchmakingEntry): number {
        // TODO: calculate a percentage based on given information
        const { user, experience } = entry;
        const { age, gender, favoriteGenre, favoriteRole } = user;
        return 0;
    }

    private generateDummyEntries() {
        const gameIds = [1905, 8173, 621, 121];
        const genders = Object.values(Gender);
        const genres = Object.values(Genre);
        const roles = Object.values(Role);
        const experience = Object.values(Experience);

        for (let i = 0; i < 200; i++) {
            const user = new User();
            user['_id'] = i.toString();
            user.username = `testuser${i}`;
            user.displayName = `testuser${i}`;
            user.email = `test${i}@test.com`;
            user.salt = `test${i}`;
            user.password = `test${i}`;
            user.age = this.randomIntFromInterval(8, 100);
            user.gender = genders[this.randomIntFromInterval(0, genders.length - 1)];
            user.favoriteGenre = genres[this.randomIntFromInterval(0, genres.length - 1)];
            user.favoriteRole = roles[this.randomIntFromInterval(0, roles.length - 1)];
            user.createdAt = Date.now();

            const entry = new MatchmakingEntry();
            entry.user = user;
            entry.experience = experience[this.randomIntFromInterval(0, experience.length - 1)];
            entry.createdAt = Date.now();

            const gameId = gameIds[this.randomIntFromInterval(0, gameIds.length - 1)];
            if (!this.matchmakings[gameId]) {
                this.matchmakings[gameId] = [];
            } else {
                this.matchmakings[gameId].push(entry);
            }
        }
    }

    private randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
