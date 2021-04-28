import { shallow, mount } from 'enzyme';
import { AuthenticationForm }  from '../AuthenticationForm';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';

let container: any = null;

describe('AuthenticationForm', () => {

    test('It should mount', () => {
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

    test('It should contain all of original elements, and match the snapshot', () => {
        let component = renderer.create(<AuthenticationForm />).toJSON();

        expect(component).toMatchSnapshot();
    });
    
});