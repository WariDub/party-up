import React, { ClassAttributes, Component, Props } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import { AuthenticationForm }  from '../AuthenticationForm';
import { Auth, onSignUp } from '../auth.api';
import NavBar from '../../Search/components/NavBar';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container: any = null;

describe('AuthenticationForm', () => {

    test('It should mound', () => {
        let component = shallow(<AuthenticationForm />);

        expect(component.length).toBe(1);
    });
    
    test('It displays the Authentication Form', () => {
        let container: any = null;
        container = document.createElement("div");
        document.body.appendChild(container);

        act(() => {
            render(<AuthenticationForm />, container);
        });

        expect(container.innerText).toBe(undefined);
    });
});