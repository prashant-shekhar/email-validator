import React from 'react'
import { EmailCreate } from '../email/EmailCreate'
import '../../setupTests'

import { mount } from 'enzyme';

test('Email create component renders the text', () => {
    const wrapper = mount(
            <EmailCreate />    
        );

    const p=wrapper.find('.heading')
    expect(p.text()).toBe('Email Validator.')
});