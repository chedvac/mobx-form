import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';

import * as React from 'react';
// import Button from 'react-ui-components/src/buttons/whiteButton.jsx';

@inject('languageStore')
@observer
class RepeatedFieldsTitle extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.defaultButtonsTexts = {
      add: {
        hebrew: 'הוסף שורה',
        english: 'Add Row',
        arabic: 'التأكيد'
      },
      remove: {
        hebrew: 'הסר שורה',
        english: 'Remove Row',
        arabic: 'الغاء'
      }
    };
  }

  mergeButtonsTexts = buttonTexts =>
    Object.assign({}, this.defaultButtonsTexts, buttonTexts);

  render() {
    const {
      rowTitle: Title,
      addAction,
      removeAction,
      buttonsTexts
    } = this.props;
    const texts = this.mergeButtonsTexts(buttonsTexts);

    return (
      //icon with isOpenContent
      <div>
        {typeof Title === 'string' ? <span>{Title}</span> : <Title />}

        <div>
          {/* <Button onClick={addAction}>
            <span>
              {' '}
              {/* icon{' '} */}
          {/* {this.props.languageStore
                .computedResourcesProvider({texts.add})
                .get()} */}
          {/* </span> */}
          {/* </Button> */}
          {/* <Button onClick={removeAction}> */}
          {/* <span> */}
          {/* {' '} */}
          {/* icon */}{' '}
          {/* {this.props.languageStore
                .computedResourcesProvider({texts.remove})
                .get()} */}
          {/* </span> */}
          {/* </Button> */} */}
        </div>
      </div>
    );
  }
}

export default RepeatedFieldsTitle;
