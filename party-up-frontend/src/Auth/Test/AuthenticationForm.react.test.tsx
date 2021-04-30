import { shallow, mount } from 'enzyme';
import  { AuthenticationForm } from '../AuthenticationForm';
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import screen, { render, getByLabelText, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon'
import '@testing-library/jest-dom';


import {
    getByRole,
    findByText,
    getByPlaceholderText,
  } from '@testing-library/dom'
  

describe('AuthenticationForm', () => {

    beforeEach(() => {
        let container = render(<div></div>)
    })

    test('It should mount', () => {
        let component = shallow(<AuthenticationForm />);

        expect(component.length).toBe(1);
    });

    test('There should be four password inputs in AuthenticationForm component', () => {
        let component = shallow(<AuthenticationForm/>);

        let userInputs = component.find('#pass');

        //userInputs.find('input');

        expect(userInputs).toHaveLength(4);
    });

    test('There should be two user inputs in AuthenticationForm component', () => {
        let component = shallow(<AuthenticationForm/>);

        let userInputs = component.find('#user');

        expect(userInputs).toHaveLength(2);
    });


    test('It should contain all of original elements, and match the snapshot', () => {
        let component = renderer.create(<AuthenticationForm />).toJSON();

        expect(component).toMatchSnapshot();
    });
});
