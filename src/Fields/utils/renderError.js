import React from 'react';

export const renderError =(message)=> {
    if (message ) {
      return (<span className='error-message'>{message}</span>);
    }
  }