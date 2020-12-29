import React from 'react'
import Stats  from '../admin/Stats'
import '../../setupTests'

import { mount, shallow } from 'enzyme';
let wrapper,props;

function createProps(props){
    return {
        totalUsers:10,
        totalActivatedUsers:5,
        ...props
    }
}
beforeEach(() => {
    props= createProps()
    wrapper = mount(<Stats {...props}/>);
});


describe('<Stats /> props',()=>{
    it('should pass 10 total and 5 activated users',()=>{
        expect(wrapper.props().totalUsers).toEqual(10)
        expect(wrapper.props().totalActivatedUsers).toEqual(5)   
    })

})

