import { shallow, mount } from 'enzyme';
import { AuthenticationForm }  from '../AuthenticationForm';
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import screen, { render, getByLabelText, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon'
describe('AuthenticationForm', () => {

    test('It should mount', () => {
        let component = shallow(<AuthenticationForm />);

        expect(component.length).toBe(1);
    });

    test('It should contain all of original elements, and match the snapshot', () => {
        let component = renderer.create(<AuthenticationForm />).toJSON();

        expect(component).toMatchSnapshot();
    });
});