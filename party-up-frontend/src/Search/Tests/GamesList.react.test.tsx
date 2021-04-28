import  GamesList  from '../components/GamesList';
import { shallow, mount } from 'enzyme';
import { render, unmountComponentAtNode } from "react-dom";
import React, { ClassAttributes, Component, Props } from 'react';
import { act } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';
import { Game } from '../interfaces/Game'


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
});
