import '@testing-library/jest-dom/extend-expect';
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new Adapter(),
})