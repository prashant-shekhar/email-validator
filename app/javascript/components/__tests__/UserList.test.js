import React from 'react'
import { UserList } from '../admin/UserList'
import '../../setupTests'

import { shallow } from 'enzyme';
let wrapper,props;

function createProps(props){
    return {
        users:[
            {
                'name':'nikhil',
                'email':'nikhilbhatt@gmail.com',
                'username':'nikhil',
                'is_activated':true
            }
        ],
        ...props
    }
}
beforeEach(() => {
    props= createProps()
    wrapper = shallow(<UserList {...props}/>);
});


describe('<UserList /> rendering',()=>{
    it('should render one <Table> ',()=>{
        expect(wrapper.find('table')).toHaveLength(1)   
    })

    it('should render 1 <thead> ',()=>{
        expect(wrapper.find('thead')).toHaveLength(1)   
    })
})

