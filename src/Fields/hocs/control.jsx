import React from 'react';
import validationProps from '../utils/validationProps'
import {enableUniqueIds} from 'react-html-id'
import { typecheck } from "mobx-state-tree";
//import { extractMessage } from "../../validations/utils";
import { getEventValue } from "../utils";

import '../CSS/control.css'

 function control (WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
        super(props);
        validationProps(props);
        enableUniqueIds(this);
        this.state={
            value : props.field,
            message :''
        }
     
        this.updateStore = this.updateStore.bind(this);
        this.validate = this.validate.bind(this);
    }
 
    updateStore=(newValue)=>{
        const message = this.validate(newValue);
        this.setState({message});
        if( !message )
          this.props.update(newValue);

    }
    validate=(newValue)=>{
        try {
            typecheck(this.props.type, newValue);
            const {validations} = this.props
            let message='';
            for (var item in validations) {
                if(!validations[item].validator(newValue)){
                    message=validations[item].message;                
                    break;
                }
              }
            return message
        } catch (e) {
            return e.message
        }
        return '';    
    }
       
    render() {
        return (
          
            <WrappedComponent {...this.props} {...this.state} 
                    id={this.lastUniqueId()}
                    onChange={(e)=>this.setState({value: getEventValue(e)})}
                    onBlur={(e)=>this.updateStore(getEventValue(e))}
            />
          
        )
    }
  }
}
export default control