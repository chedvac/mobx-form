import React from 'react'
import {observer} from 'mobx-react'
import LabelField from '../Elements/LabelField'
import {updateValue} from './utils/actions'
import validationProps from './utils/validationProps'
import {enableUniqueIds} from 'react-html-id'

@observer
export default class BaseInput extends React.Component{
    
    constructor(props) {
        super(props);
        validationProps(props);
        enableUniqueIds(this);
    }
      
    render(){
        const {  field, label, isRequired} = this.props || {};
        return(
            <div>
                <LabelField label={label} isRequired={true} htmlFor={this.nextUniqueId()}/>
                <input
                    id={this.lastUniqueId()}
                    onChange={(e)=>updateValue(e.target.value,field)}
                    value={field.value}
                    className="text-field" 
                />             
                {/* <Error error={field.message}/> */}
            </div>
        );
    }
    
}