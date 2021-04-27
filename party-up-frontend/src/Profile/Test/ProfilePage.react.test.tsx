import  ProfilePage  from '../ProfilePage';
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import renderer from 'react-test-renderer';

describe('ProfilePage', () => {

    test('It should mount', () => {

        let history = createBrowserHistory();

        history.push('/');

        let location = history.location;

        let match = matchPath('/', {
            path:'/',
            exact: true,
            strict: false
        });

        let component = shallow(<ProfilePage history = { history } location = { location } match = { match }/>);

        expect(component.length).toBe(1);
    });

    test('It should mount', () => {

        let history = createBrowserHistory();

        history.push('/');

        let location = history.location;

        let match = matchPath('/', {
            path:'/',
            exact: true,
            strict: false
        });

        let component = renderer.create(<ProfilePage history = { history } location = { location } match = { match }/>).toJSON();

        expect(component).toMatchSnapshot();
    });
});