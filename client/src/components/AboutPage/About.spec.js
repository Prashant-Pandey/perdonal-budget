import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AboutPage from "./AboutPage.jsx";

describe('App component', ()=>{
  it("Should be running", () => {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper.find(".AboutPage")).toBeTruthy();
  });

  it("Should have one main only", () => {
    const component = shallow(<AboutPage />);
    const wrapper = component.find(".AboutPage")
    expect(wrapper.length).toBe(1);
  });
})

// it("renders Account header", () => {
//   const wrapper = shallow(<App />);
//   const welcome = <h1>Display Active Users Account Details</h1>;
//   expect(wrapper.contains(welcome)).toEqual(true);
// });