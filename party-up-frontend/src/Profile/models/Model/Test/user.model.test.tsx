import Gender from '../../../enums/gender.enum';
import Genre from '../../../enums/genre.enum';
import Role from '../../../enums/role.enum';
import User from '../../user.model';

describe('User Model', () => {
    test('The user model should contain all of the original properties required for application use', () => {
        let testUser: User = {
            _id: '1',
            username: 'TestUsername',
            displayName: 'TestDisplayName',
            email: 'TestEmail@TestEmail.com',
            avatarUrl: 'TestAvatarURL.com',
            friends: ['Friend1', 'Friend2'],
            age: 23,
            gender: Gender.MALE,
            favoriteGenre: Genre.ACTION,
            favoriteRole: Role.DPS,
            createdAt: 5/23/2021
        }

        expect(testUser._id).toBeDefined();
        expect(testUser.username).toBeDefined();
        expect(testUser.displayName).toBeDefined();
        expect(testUser.email).toBeDefined();
        expect(testUser.avatarUrl).toBeDefined();
        expect(testUser.friends).toBeDefined();
        expect(testUser.age).toBeDefined();
        expect(testUser.gender).toBeDefined();
        expect(testUser.favoriteGenre).toBeDefined();
        expect(testUser.favoriteRole).toBeDefined();
        expect(testUser.createdAt).toBeDefined();
    });
});