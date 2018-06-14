import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control'
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'

@observer
class Select extends React.Component{
    
    constructor(props) {
        super(props);
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
        this.props.options.unshift(
            {key: "", value:optionCaption}
          );
    }
    currentResources = function(){
        return this.texts['hebrew']//this.props.applicationData.formLanguage.model.name];
    };
   
    render(){
        const { options=[] } = this.props || {};
        return( 
            <div>
                {renderLabel(this.props)}
                <select className="select-field" {...this.props}>   
                    {options.map(option =>
                        <option key={option.key} value={option.key}>{option.value}</option>)
                    }
                </select>    
                {renderError(this.props.message)}      
            </div>
        );
    }
  
}
export default control(Select)