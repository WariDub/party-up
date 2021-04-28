import MatchesList from '../components/MatchesList';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import Match from '../models/match.model';
import MatchmakingEntryModel from '../models/matchmaking-entry.model';
import User from '../../Profile/models/user.model';
import experience from '../../Matchmaking/enums/experience.enum';
import Gender from '../../Profile/enums/gender.enum';
import Genre from '../../Profile/enums/genre.enum';
import Role from '../../Profile/enums/role.enum';

describe('MatchestList', () => {
    test('It should mount', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/',{
            path: '/',
            exact: true,
            strict: false
        });

        let user: User = {
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

        let entryMode: MatchmakingEntryModel = {
            user: user,
            experience: experience.BEGINNER,
            createdAt: 4/27/2021,
            identifier: 'TestIdentifier'
        }

        let matchymatch: Match = {
            entry: entryMode,
            percentage: 80
        }

        let component = shallow(<MatchesList history = { history } location = { location } matches = { [matchymatch] } match = { match }/>);

        expect(component.length).toBe(1);
    });
    
    test('It should mount', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/MatchmakingPage',{
            path: '/MatchmakingPage',
            exact: true,
            strict: false
        });

        let user: User = {
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

        let entryMode: MatchmakingEntryModel = {
            user: user,
            experience: experience.BEGINNER,
            createdAt: 4/27/2021,
            identifier: 'TestIdentifier'
        }

        let matchymatch: Match = {
            entry: entryMode,
            percentage: 80
        }

        let matches: Match[] = [matchymatch];

        let component = renderer.create(<MatchesList history = { history } location = { location } matches = { matches } match = { match }/>).toJSON();

        expect(component).toMatchSnapshot();
    });
})