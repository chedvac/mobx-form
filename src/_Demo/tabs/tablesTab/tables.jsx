import React from 'react'
import {observer} from 'mobx-react'
import Input from '../../../Fields/Input';
import {injectWrapper, getPropsInject} from '../../../core/inject';
import {inject} from 'mobx-react'

@inject("applicationData")
@observer
export default class Tables extends React.Component{
    
    constructor(props) {
        super(props);  
        this.texts = {
            hebrew: {
                email: ' מייל',
                houseNumber: ' מספר בית'
            },
            english: {
                email: 'first name',
                houseNumber:'last name'
            },
            arabic: {
                email: 'first name',
                houseNumber:'last name'
            }
        }
        this.currentResources = this.currentResources.bind(this);
    }
    currentResources = function(){
        return this.texts[this.props.applicationData.formLanguage.name];
    }; 
    render(){
        const Email = getPropsInject(Input,this.props,'email');
        const HouseNumber = getPropsInject(Input,this.props,'houseNumber');

        return(   
            <div className="row">
                <div className="col-md-4">
                    <Email label={this.currentResources().email}/>
                </div>
                <div className="col-md-4">   
                    <HouseNumber label={this.currentResources().houseNumber}/>        
                </div> 
            </div>
        );
    }
}