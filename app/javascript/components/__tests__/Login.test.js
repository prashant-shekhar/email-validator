import React from 'react'
import { Login } from '../authentication/Login'
import '../../setupTests'

import { shallow } from 'enzyme';

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Login/>);
});
describe('<Login/> rendering',()=>{
    it('should render one <Form> ',()=>{
        expect(wrapper.find('form')).toHaveLength(1)   
    })

    it('should render two <input> ',()=>{
        expect(wrapper.find('input')).toHaveLength(2)   
    })
})

describe('<Login /> interactions', () => {
    it('should change state of email input', () => {
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'someone@gmail.com'}});
        expect(wrapper.state('email')).toEqual('someone@gmail.com');
        expect(wrapper.state('password')).toEqual('');
    });


    it('should change state of password input', () => {
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'password'}});
        expect(wrapper.state('password')).toEqual('password');
        expect(wrapper.state('email')).toEqual('');
    });

});
