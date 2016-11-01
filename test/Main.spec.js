import React from 'react';
import Dialog from 'material-ui/Dialog';

import {expect} from 'chai';
import {mount} from 'enzyme';

import Main from '../src/react/Main';


describe('<Main />', () => {
  it('contains an <Dialog /> component', () => {
    const wrapper = mount(<Main />);
    expect(wrapper.find(Dialog)).to.have.length(1);
  });
});
