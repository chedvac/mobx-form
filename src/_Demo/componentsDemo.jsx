import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import ExamplesTab from './tabs/ExamplesTab/ExamplesTab';
import RouteSettings from 'react-navigation-router/RouteSettings';
import Navigation from 'react-ui-components/navigation/Navigation';
import { inject } from 'mobx-react';
import injectSheet from 'react-jss';

const styles = theme => {
  return {
    content: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '80%'
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '80%'
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: '70%'
      },
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      margin: 'auto'
    }
  };
};

@injectSheet(styles)
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
    const SimpleFields = inject(stores => ({
      simpleFields: this.props.rootStore.simpleFieldsTab
    }))(SimpleFieldsTab);
    const Examples = inject(stores => ({
      examples: this.props.rootStore.examplesTab
    }))(ExamplesTab);

    const tabs = [
      new RouteSettings({
        name: 'שדות רגילים',
        path: '/SimpleFields',
        component: SimpleFields
      }),
      new RouteSettings({
        name: 'טבלאות',
        path: '/Tables',
        component: Tables
      }),
      new RouteSettings({
        name: ' רכיבים',
        path: '/ExamplesTab',
        component: Examples
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
      </form>
    );
  }
}

export default ComponentsDemo;
