import { shallow } from 'enzyme';
import renderer, { create } from 'react-test-renderer';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import MatchmakingPage from '../MatchmakingPage';

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

        let component = shallow(<MatchmakingPage history = { history } location = { location } match = { match }/>)

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

        let component = renderer.create(<MatchmakingPage history = { history } location = { location } match = { match }/>).toJSON();

        expect(component).toMatchSnapshot();
    });
});