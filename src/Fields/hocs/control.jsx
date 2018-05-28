import React from 'react';
import validationProps from '../utils/validationProps'
import {enableUniqueIds} from 'react-html-id'
import { getEventValue } from "../utils";

import '../CSS/control.css'

 
function control (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            enableUniqueIds(this);
            this.state={
                value : props.field
            }
            this.updateStore = this.updateStore.bind(this);
        }
   
        updateStore=(newValue)=>{
            this.props.update(newValue);
        }

        UNSAFE_componentWillReceiveProps(nextProps){
            this.setState({value:nextProps.field})
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

  