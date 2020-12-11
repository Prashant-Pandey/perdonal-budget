import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from "./AboutPage.jsx";

describe('About component', ()=>{
  it("Should be running", () => {
    const component = shallow(<AboutPage />);
    const wrapper = component.find(".AboutPage")
    expect(wrapper.length).toBe(1);
  });
})