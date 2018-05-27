import React from 'react';

export const renderLabel=(props)=> {
    if (props.label) {
       return <label htmlFor={props.id} className={"label-field " + (props.isRequired? "required":"")}>{props.label}</label>
    }
    if (props.customLabel) {
      return (<props.customLabel />);
    }
    return null
}