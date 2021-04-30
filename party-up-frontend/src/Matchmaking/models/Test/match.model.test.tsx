import Match from '../../models/match.model';
import MatchmakingEntry from '../matchmaking-entry.model';
import User from '../../../Profile/models/user.model';
import Gender from '../../../Profile/enums/gender.enum';
import Genre from '../../../Profile/enums/genre.enum';
import Role from '../../../Profile/enums/role.enum';
import Experience from '../../enums/experience.enum';

describe('Match Model', () => {
    test('It should contain all of the necessary properties for application use', () => {
        
        let user: User  = {
            _id: '1',
            username: 'TestUsername',
            displayName: 'TestDisplayName',
            email: 'testEmail@testemail.com',
            avatarUrl: 'testURL',
            friends: ['TestFriend1', 'TestFriend2'],
            createdAt: 4/27/2021,
            age: 21,
            gender: Gender.MALE,
            favoriteGenre: Genre.HORROR,
            favoriteRole: Role.DPS
        }

        let entry: MatchmakingEntry = {
            user: user,
            experience: Experience.BEGINNER,
            createdAt: 4/27/2021,
            identifier: 'TestIdentifier'
        }
        
        let matchymatch: Match = {
            entry: entry,
            percentage: 80
        }

        expect(matchymatch.entry).toBeDefined();
        expect(matchymatch.percentage).toBeDefined();
    });
});
