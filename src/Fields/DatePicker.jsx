import React from 'react'
import {observer} from 'mobx-react'
import {updateValue} from './utils/actions'
import validationProps from './utils/validationProps'
import {enableUniqueIds} from 'react-html-id'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
@observer
export default class DatePicker extends React.Component{
    
    constructor(props) {
        super(props);
        validationProps(props);
        enableUniqueIds(this);
    }
      
    render(){
        const {  field, label, isRequired} = this.props || {};
        return (
            <SingleDatePicker
              {...props}
              id="date_input"
              date={date}
              focused={focused}
              onDateChange={this.onDateChange}
              onFocusChange={this.onFocusChange}
            />
          );
        return(
            <div>
                {/* <LabelField label={label} isRequired={true} htmlFor={this.nextUniqueId()}/> */}
                <input
                    id={this.lastUniqueId()}
                    onChange={(e)=>updateValue(e.target.value,field)}
                    value={field}
                    className="text-field" 
                />             
                {/* <Error error={field.message}/> */}
            </div>
        );
    }
    
}