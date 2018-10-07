import React from 'react';

import { Link } from 'react-router-dom';
export default props => (
  <Link to={props.to}>
    {props.children ? React.cloneElement(props.children, { ...props }) : ''}
  </Link>
);
