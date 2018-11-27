import { observable, computed } from 'mobx';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import * as React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { forOwn, upperFirst } from 'lodash/fp';
import RepeatedFieldsContext from './repeatedFieldsContext';
import RepeatedFieldsTitle from './repeatedFieldsTitle';

@inject('languageStore')
@observer
class RepeatedFields extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var self = this;
    //  console.log(this.props);
    const {
      array,
      // propName,
      rowTitle,
      renderComponent,
      addAction,
      removeAction ///get Component child in settings???
    } = self.props;

    return (
      <div>
        aaaaaaaaaaaa
        {array.map((item, index) => (
          <div key={index}>
            <RepeatedFieldsTitle
              rowTitle={rowTitle}
              addAction={addAction}
              removeAction={removeAction}
            />
            {/* typeof Title === 'string' ? <span>{Title}</span> : <Title /> */}
            {/* //bbbbbbbbb, // buttons with actions */}
            {renderComponent(item)}
            {/* <RepeatedFieldsContext.Provider value={{ [propName]: item }}>
              {self.props.children}
            </RepeatedFieldsContext.Provider> */}
          </div>
        ))}
      </div>
    );
  }
}
RepeatedFields.propTypes = {
  languageStore: PropTypes.any.isRequired,
  settings: PropTypes.shape({
    array: PropTypes.array, //MobxPropTypes.observableArray,
    rowTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.any]), //PropTypes.func to observable/computed???
    renderComponent: PropTypes.any
    // addAction: PropTypes.func,
    // removeAction: PropTypes.func,
    // propName: PropTypes.string.isRequired
  })
};
export default RepeatedFields;
