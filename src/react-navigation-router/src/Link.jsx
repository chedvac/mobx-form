import React from 'react';
import { omit } from 'lodash';
export default props => {
  const { linkClassNames, to } = props;
  props = omit(props, ['linkClassNames', 'to']);
  return (
    <a href={to} className={linkClassNames || ''}>
      {props.children ? React.cloneElement(props.children, { ...props }) : ''}
    </a>
  );
};
