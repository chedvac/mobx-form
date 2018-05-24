import React from 'react'
import {observer} from 'mobx-react'
import LabelField from '../Elements/LabelField'
import {updateValue} from './utils/actions'
import validationProps from './utils/validationProps'


@observer
export default class BaseSelect extends React.Component{
    
    constructor(props) {
        super(props);
        validationProps(props);

    }
   
      
    render(){
        const {  field, label } = this.props || {};
        return(
            <div>
                
                <input type="checkbox"
                    onChange={(e)=>updateValue(e.target.checked,field)}
                    value={field.value}
                    className="checkbox-field" 
                />   
                <LabelField label={label} />
                {/* <Error error={field.message}/> */}
            </div>
        );
    }
  
}