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
        this.state = {
            options :props.options||[]
        }
        this.texts = {
            english: {
                optionCaption: 'Choose'
            },
            hebrew: {
                optionCaption: 'בחר'
            },
            arabic: {
                optionCaption: 'اختر'
            }
        };
        !props.noOptionsCaption ? this.addOptionCaption():null;
    }
    addOptionCaption = function(){
        const optionCaption = this.props.optionCaption || this.currentResources().optionCaption;
        this.state.options.unshift(
            {key: "", value:optionCaption}
          );
    }
    currentResources = function(){
        return this.texts['english'/*this.props.formLanguage.name*/];
    };
   
    render(){
        const {  field, label } = this.props || {};
        return(
            <div>
                <LabelField label={label} />
                <select 
                    onChange={(e)=>updateValue(e.target.value,field)}
                   
                    value={field.value}
                    className="select-field" 
                >   
                    {this.state.options.map(option =>
                     <option key={option.key} value={option.key}>{option.value}</option>)
                    }
                 </select>          
                {/* <Error error={field.message}/> */}
            </div>
        );
    }
  
}