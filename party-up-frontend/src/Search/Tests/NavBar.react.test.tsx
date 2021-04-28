import { shallow } from 'enzyme' 
import renderer from 'react-test-renderer';
import NavBar from '../components/NavBar';
import { Game } from '../../Search/interfaces/Game';
import { createBrowserHistory } from 'history'
import { matchPath } from 'react-router';
import sinon from 'sinon';

describe('NavBar', () => {
    test('Should render without crashing', () => {

        let game: Game = {
            id: 'TestId',
            name: 'TestName'
        }

        let gameList: Game[] = [game];

        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });


        let component = shallow(<NavBar showSearchBar = { true } onQueryResult = {null} history = { history } location = { location } match = { match } />)

        expect(component.length).toBe(1);
    });

    test('The elements of the UI should all render, and be unchanged', () => {
        let game: Game = {
            id: 'TestId',
            name: 'TestName'
        }

        let gameList: Game[] = [game];

        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let component = renderer.create(<NavBar showSearchBar = { true } onQueryResult = {null} history = { history } location = { location } match = { match } />).toJSON();

        expect(component).toMatchSnapshot();
    });

    test('Should not render search bar if showSearchBar is false', () => { 
        let game: Game = {
            id: 'TestId',
            name: 'TestName'
        }

        let gameList: Game[] = [game];

        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let component = shallow(<NavBar showSearchBar = { false } onQueryResult = {null} history = { history } location = { location } match = { match } />)

        const spy = jest.spyOn( NavBar.prototype, 'renderSearchBar');

        expect(spy).toHaveBeenCalledTimes(0);
    });
});