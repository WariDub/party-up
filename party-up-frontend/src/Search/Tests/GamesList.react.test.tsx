import  GamesList  from '../components/GamesList';
import { shallow, mount } from 'enzyme';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import { Game } from '../interfaces/Game';
import renderer from 'react-test-renderer';

describe(GamesList, () =>{
    test('It should mount', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let game: Game = {
            id: 'TestId',
            name: 'TestName'
        }

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let results: Game[] = [game];

        let component = shallow(<GamesList history = { history } location = { location } match = { match }/>);

        expect(component.length).toBe(1);
    });

    test('It should mount', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let game: Game = {
            id: 'TestId',
            name: 'TestName'
        }

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });

        let results: Game[] = [game];

        let component = renderer.create(<GamesList history = { history } location = { location } match = { match }/>).toJSON();

        expect(component).toMatchSnapshot();
    });
});
