import React, { Component } from 'react';
import Form from './components/Form/Form';
import PersonalInformation from './components/PersonalInformation/PersonalInformation';
import injectWrapper from './core/inject'
import rootStore from './rootStore'

export default class ExampleForm extends Component { // destruct non-valid props
    constructor(props){
        super(props)
        this.store = new rootStore();
    }
    
    render() {
        console.log(rootStore)
        const UserDetails = injectWrapper(PersonalInformation,this.store.store.userDetails.model)
        return(
            <Form ref={c => { this.Form = c }}>

               
                <UserDetails />
              
            </Form>
        )
    }
};