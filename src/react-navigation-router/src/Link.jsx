import React from 'react';
import { omit } from 'lodash';
export default props => {
  const { linkClassNames, to, children } = props;
  props = omit(props, ['linkClassNames', 'to', 'children']);
  return (
    <a href={to} className={linkClassNames || ''}>
      {children ? React.cloneElement(children, { ...props }) : ''}
    </a>
  );
};
