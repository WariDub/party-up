import Match from '../../models/match.model';
import MatchmakingEntry from '../matchmaking-entry.model';
import User from '../../../Profile/models/user.model';
import Gender from '../../../Profile/enums/gender.enum';
import Genre from '../../../Profile/enums/genre.enum';
import Role from '../../../Profile/enums/role.enum';
import Experience from '../../enums/experience.enum';

describe('MatchMaking Entry Model', () => {
    test('It should contain all of the necessary properties for application functionality', () => {
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
       
        let matchEntry: MatchmakingEntry = {
            user: user,
            experience: Experience.BEGINNER,
            createdAt: 4/27/2021,
            identifier: 'TestIdentifier'
        }

        expect(matchEntry.user).toBeDefined();
        expect(matchEntry.experience).toBeDefined();
        expect(matchEntry.createdAt).toBeDefined();
        expect(matchEntry.identifier).toBeDefined();
    });
});