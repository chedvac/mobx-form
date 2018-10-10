import React from 'react';

export default props => (
  <a href={props.to} className={props.className}>
    {props.children ? React.cloneElement(props.children, { ...props }) : ''}
  </a>
);
