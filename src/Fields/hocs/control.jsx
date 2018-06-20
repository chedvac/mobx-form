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
            this.updateState=this.updateState.bind(this);
        }
   
        updateStore=(e)=>{
            const newValue=getEventValue(e);
            this.props.update(newValue);
        }

        updateState=(e)=>{
            this.setState({value: getEventValue(e)});
        }

        shouldComponentUpdate(nextProps, nextState){
            if( this.props.field!==nextProps.field && this.state.value !== nextProps.field)// 
            {
                this.setState({value:nextProps.field});
                return true;
            }
            return true;
        }

        render() {
            return (
                <WrappedComponent {...this.props} {...this.state} 
                        id={this.lastUniqueId()} 
                        onChange={this.updateState}
                        onBlur={this.updateStore}
                />
            )
        }
    }
}
export default control