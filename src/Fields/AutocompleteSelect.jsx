import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control' 
import Select from 'react-select';
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'
import { getEventValue } from "./utils";
import {extendSettingsWithDefaults} from '../utilities/reflection'
import {enableUniqueIds} from 'react-html-id'
import 'react-select/dist/react-select.css';

@observer
class AutocompleteSelect extends React.Component{
    
    constructor(props) {
        super(props);
        enableUniqueIds(this);
        
        this.state={
            value : props.field
        }
        this.onChangeAction = this.onChangeAction.bind(this);
        this.onInputChangeAction = this.onInputChangeAction.bind(this);
        this.onBlurAction=this.onBlurAction.bind(this);
    }

    onChangeAction=(selectedOption)=>{
        if(selectedOption){
            this.select.setInputValue(selectedOption.dataText);
        }
    };
    onInputChangeAction=(inputValue)=>{
        if(this.state.value.dataText=== inputValue){
            return inputValue; 
        }
        const dataCode= inputValue ?'-1':'';
        const selectValue ={"dataCode":dataCode, "dataText": inputValue};
        this.setState({value:selectValue});
        return inputValue;
    };
    onBlurAction=()=>{
        if(this.state.value.dataText)
        {
            let selectedValue = this.props.options.find(item=> item.dataText ===  this.state.value.dataText);
            if(selectedValue){
                this.setState({value: selectedValue});
                this.props.update(selectedValue);
                return;
            }
            if(!this.props.createdValue){
                this.select.setInputValue('');
                this.props.update({"dataCode":'', "dataText": ''});
                return;
            }

        }
        this.props.update(this.state.value);
    }

    render(){
        const defaultSettings={
            ...this.state,
            id: this.lastUniqueId(),
            ref: (ref) =>{ this.select = ref;},
            name: "selected-state",
            matchProp:  "label",
            onBlurResetsInput: false,
            onSelectResetsInput: false,
            onChange: this.onChangeAction,
            onInputChange: this.onInputChangeAction,
            onBlur: this.onBlurAction,
            labelKey: "dataText",
            valueKey: "dataCode",
            searchable : false,
            matchPos: "start",
            clearable: false
        }
      
        const settings = extendSettingsWithDefaults(this.props, defaultSettings)
        return (
          <div>
              {renderLabel(this.props)}
            <Select style={{width:"200px"}} 
                {...settings} 
                dataText={settings.field.dataText}
                />
              {renderError(this.props.message)}
          </div>
        );
      }
}
export default AutocompleteSelect


