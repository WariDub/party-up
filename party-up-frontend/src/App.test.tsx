import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


describe('App', () => {
  test('It should mount', () => {
    let component = shallow(<App/>);

    expect(component.length).toBe(1);
  });

  test('It should match snapshot of App, to ensure that the UI is unintentially affected by any updates', () => {
    let component = renderer.create(<App/>).toJSON();

    expect(component).toMatchSnapshot();
  })
});