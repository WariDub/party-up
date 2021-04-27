import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import  EditProfileForm  from '../components/EditProfileForm';
import User from '../models/user.model';
import Gender from '../enums/gender.enum';
import Genre from '../enums/genre.enum';
import Role from '../enums/role.enum';
import Match from '../../Matchmaking/models/match.model';
import Experience from '../../Matchmaking/enums/experience.enum';
import MatchMakingEntryModel from '../../Matchmaking/models/matchmaking-entry.model';
import MatchesList from '../../Matchmaking/components/MatchesList';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';


describe('EditProfileForm', () => {
    test('It should mount', () => {
        let history = createBrowserHistory();

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

        history.push('/');

        let location = history.location;
        
        let matchity = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let component = shallow(<EditProfileForm user={testUser} match={ matchity } history= { history } location = { location } />)

        expect(component.length).toBe(1);
    });

    test('It should render the EditProfileForm, and display all of the appropriate fields', () => {
        let history = createBrowserHistory();

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

        history.push('/');

        let location = history.location;
        
        let matchity = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let component = renderer.create(<EditProfileForm user={testUser} match={ matchity } history= { history } location = { location } />).toJSON();


        expect(component).toMatchSnapshot();
    });


});