import { shallow } from 'enzyme' 
import renderer from 'react-test-renderer';
import NavBar from '../components/NavBar';
import { Game } from '../../Search/interfaces/Game';
import { createBrowserHistory } from 'history'
import { matchPath } from 'react-router';
import sinon from 'sinon';
import { Button } from '@material-ui/core';
import screen, { render, getByLabelText, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



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

    test('It should render a clickable profile button', () => {
        const container = render(<NavBar/>);

        expect(container.getByRole('button', {name: 'Profile'})).toBeDefined();
    });

    test('It should render a clickable Logout button', () => {
        const container = render(<NavBar/>);

        expect(container.getByRole('button', {name: 'Logout'})).toBeDefined();
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

    test('Should render search bar if showSearchBar is false', () => { 
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

        const spy = jest.spyOn( NavBar.prototype, 'renderSearchBar');

        expect(spy).toHaveBeenCalled();
    });
});