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
          enableUniqueIds(this);
         
       
          this.updateStore = this.updateStore.bind(this);
      }
   
      updateStore=(newValue)=>{
          this.props.update(newValue);
  
      }
      render() {
          return (
            
              <WrappedComponent {...this.props} 
                      id={this.lastUniqueId()} 
                      onChange={(e)=>this.setState({value: getEventValue(e)})}
                      onBlur={(e)=>this.updateStore(getEventValue(e))}
              />
            
          )
      }
    }
  }
  export default control
  
  