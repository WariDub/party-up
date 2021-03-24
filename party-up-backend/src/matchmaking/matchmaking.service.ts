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
    private matchmakings: Map<number, Map<string, MatchmakingEntry>> = new Map();

    constructor() {
        this.generateDummyEntries();
        // TODO: make a function that loops every few minutes to clear old entries
    }

    async createMatchmakingEntry(
        user: User,
        createMatchmakingEntryDto: CreateMatchmakingEntryDto,
    ): Promise<Match[]> {
        const { game, experience } = createMatchmakingEntryDto;
        const newEntry = new MatchmakingEntry();
        newEntry.user = user;
        newEntry.experience = experience;
        newEntry.createdAt = Date.now();

        if (!this.matchmakings.has(game.id)) {
            this.matchmakings.set(game.id, new Map());
        }
        if (this.matchmakings.get(game.id).has(user.username)) {
            this.matchmakings.get(game.id).delete(user.username);
        }

        const matches: Match[] = [];

        for (const entry of this.matchmakings.get(game.id).values()) {
            const match = new Match();
            match.entry = entry;
            match.percentage = this.calculateMatchPercentage(newEntry, entry);
            matches.push(match);
        }

        this.matchmakings.get(game.id).set(user.username, newEntry);
        return matches.sort((a, b) => b.percentage - a.percentage);
    }

    private calculateMatchPercentage(requester: MatchmakingEntry, entry: MatchmakingEntry): number {
        let maxPoints = 0;
        let points = 0;

        // experience
        maxPoints += 6;
        if (requester.experience === entry.experience) {
            points += 6;
        } else if (
            requester.experience === Experience.BEGINNER &&
            entry.experience === Experience.INTERMEDIATE
        ) {
            points += 2;
        } else if (requester.experience === Experience.INTERMEDIATE) {
            points += 2;
        } else if (
            requester.experience === Experience.ADVANCED &&
            entry.experience === Experience.INTERMEDIATE
        ) {
            points += 1;
        }

        // age group
        maxPoints += 6;
        const requesterAge = requester.user.age;
        const entryAge = entry.user.age;

        if (this.numberIsBetween(requesterAge - 4, requesterAge + 4, entryAge)) {
            points += 6;
        } else if (this.numberIsBetween(requesterAge - 8, requesterAge + 8, entryAge)) {
            points += 4;
        } else if (this.numberIsBetween(requesterAge - 10, requesterAge + 10, entryAge)) {
            points += 2;
        } else {
            points += 0.5;
        }

        // gender
        maxPoints += 2;
        if (requester.user.gender === entry.user.gender) {
            points += 2;
        }

        // favorite genre
        maxPoints += 3;
        if (requester.user.favoriteGenre === entry.user.favoriteGenre) {
            points += 3;
        }

        // favorite role
        maxPoints += 3;
        if (requester.user.favoriteRole === entry.user.favoriteRole) {
            points += 3;
        }

        return Math.round((points / maxPoints) * 100);
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
            user.age = this.randomIntFromInterval(8, 70);
            user.gender = genders[this.randomIntFromInterval(0, genders.length - 1)];
            user.favoriteGenre = genres[this.randomIntFromInterval(0, genres.length - 1)];
            user.favoriteRole = roles[this.randomIntFromInterval(0, roles.length - 1)];
            user.createdAt = Date.now();

            const entry = new MatchmakingEntry();
            entry.user = user;
            entry.experience = experience[this.randomIntFromInterval(0, experience.length - 1)];
            entry.createdAt = Date.now();

            const gameId = gameIds[this.randomIntFromInterval(0, gameIds.length - 1)];
            if (!this.matchmakings.has(gameId)) {
                this.matchmakings.set(gameId, new Map());
            }
            this.matchmakings.get(gameId).set(user.username, entry);
        }
    }

    private randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private numberIsBetween(min: number, max: number, x: number): boolean {
        return x >= min && x <= max;
    }
}
