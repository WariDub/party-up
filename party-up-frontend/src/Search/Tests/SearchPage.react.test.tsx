import { shallow } from 'enzyme' 
import renderer from 'react-test-renderer';
import SearchPage from '../SearchPage';
import { Game } from '../../Search/interfaces/Game';
import { createBrowserHistory } from 'history'
import { matchPath } from 'react-router';

describe('Search Page', () => {
    test('It should render without crashing', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });
        
        let component = shallow(<SearchPage history = { history } location = { location } match = { match } />);

        expect(component.length).toBe(1);
    });

    test('It should render without crashing', () => {
        let history = createBrowserHistory();
        history.push('/');

        let location = history.location;

        let match = matchPath('/ProfilePage', {
            path: '/ProfilePage',
            exact: true,
            strict: false,
        });
        
        let component = renderer.create(<SearchPage history = { history } location = { location } match = { match } />).toJSON();

        expect(component).toMatchSnapshot();
    });
});