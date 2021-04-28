import { shallow } from 'enzyme';
import renderer, { create } from 'react-test-renderer';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import MatchmakingPage from '../MatchmakingPage';
import MatchmakingEntryModel from '../models/matchmaking-entry.model';
import User from '../../Profile/models/user.model';
import experience from '../../Matchmaking/enums/experience.enum';
import Match from '../models/match.model';

describe('MatchMakingPage', () =>{
    test('It should mount', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/', {
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
            createdAt: 4/27/2021
        }

        let entryMode: MatchmakingEntryModel = {
            user: user,
            experience: experience.BEGINNER,
            createdAt: 4/27/2021
        }

        let matchymatch: Match = {
            entry: entryMode,
            percentage: 80
        }

        let component = shallow(<MatchmakingPage history = { history } location = { location } match = { match } matches = { [matchymatch] }/>)

        expect(component.length).toBe(1);
    });

    test('It should render the MatchMakingPage, with all the necessary attriburtes', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/', {
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
            createdAt: 4/27/2021
        }

        let entryMode: MatchmakingEntryModel = {
            user: user,
            experience: experience.BEGINNER,
            createdAt: 4/27/2021
        }

        let matchymatch: Match = {
            entry: entryMode,
            percentage: 80
        }

        let component = renderer.create(<MatchmakingPage history = { history } location = { location } match = { match } matches = { [matchymatch] } />).toJSON();

        expect(component).toMatchSnapshot();
    });
});