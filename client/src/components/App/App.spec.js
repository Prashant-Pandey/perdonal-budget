import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import {findByTestAttr} from "../../test.utils";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const setup = (props = {}) => {
  const store = mockStore({});
  return shallow(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
  
}


describe('App component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })
  it("Should be running", () => {
    const wrapper = findByTestAttr(component, "main-container");
    console.log(wrapper.debug());
    expect(wrapper.length).toBe(0);
  });
})

// it("renders Account header", () => {
//   const wrapper = shallow(<App />);
//   const welcome = <h1>Display Active Users Account Details</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });