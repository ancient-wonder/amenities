import React from 'react';
import { shallow, mount, render } from 'enzyme';
import boatRule from './../components/boatRule';

test('should render one <h5> components', () => {
  const wrapper = shallow(<div/>);
  expect(wrapper.find(h5)).to.have.length(1);
});
