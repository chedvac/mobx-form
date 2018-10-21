import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import Tab3Tab from './tabs/Tab3/tab3';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Navigation from 'reactUiComponents/navigation/Navigation';
import { inject } from 'mobx-react';
import withPropsStyles from 'govil-common-content/forms-ui-components/src/styles';

const styles = (props, theme) => {
  return {
    content: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: `${
        props.drawerForContentWidth
      }px`,
      width: `calc(100% - ${props.drawerForContentWidth}px)`
    }
  };
};

// @withStyles(styles, { withTheme: true })
class ComponentsDemo extends Component {
  // destruct non-valid props
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const Tables = inject(stores => ({
      tables: this.props.rootStore.tablesTab
    }))(TablesTab);

    const Tab3 = inject(() => ({
      tab3: this.props.rootStore.tab3Tab
    }))(Tab3Tab);

    const SimpleFields = inject(() => ({
      simpleFields: this.props.rootStore.simpleFieldsTab
    }))(SimpleFieldsTab);

    const tabs = [
      new RouteSettings({
        name: 'לשדות רגילים',
        path: '/SimpleFields',
        component: SimpleFields
      }),
      new RouteSettings({
        name: 'טבלאות',
        path: '/Tables',
        component: Tables
      }),
      new RouteSettings({
        name: 'טאב 3',
        path: '/Tab3',
        component: Tab3
      })
    ];
    console.log('rootStore', this.props.rootStore);

    return (
      <form
        className={classes.content}
        ref={c => {
          this.Form = c;
        }}
      >
        <Navigation routeSettings={tabs} />
        <div className="row">
          <div className="small-12 columns">
            <button
              className="button"
              type="button"
              onClick={this.props.rootStore.validateForm}
            >
              בדוק תקינות{' '}
            </button>
          </div>

          <div className="small-12 columns">
            <button
              className="button"
              type="button"
              onClick={this.props.rootStore.submitForm}
            >
              שלח{' '}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withPropsStyles(styles, true)(ComponentsDemo);
