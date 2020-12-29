import React from 'react'
import Stats  from '../admin/Stats'
import '../../setupTests'

import { shallow } from 'enzyme';
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
    wrapper = shallow(<Stats {...props}/>);
});


describe('<Stats /> rendering',()=>{
    it('should render 10 total and 5 deactivated users',()=>{
        expect(wrapper.find('h2').first().text()).toEqual("10")   
        expect(wrapper.find('h2').last().text()).toEqual("5")   
    })

})

