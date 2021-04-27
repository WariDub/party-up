import  GamesList  from '../components/GamesList';
import { shallow, mount } from 'enzyme';
import { render, unmountComponentAtNode } from "react-dom";
import React, { ClassAttributes, Component, Props } from 'react';
import { act } from '@testing-library/react';




describe(GamesList, () =>{
    test('It should mount', () => {
        let component = shallow(<GamesList />);
        expect(component.length).toBe(1);
    });
});
