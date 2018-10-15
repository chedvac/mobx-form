import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import Tab3Tab from './tabs/Tab3/tab3';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Navigation from 'reactUiComponents/navigation/Navigation';
import Toolbar from '../components/toolbar/Toolbar';
import { inject } from 'mobx-react';

export default class ComponentsDemo extends Component {
  render() {
    const Tables = inject(() => ({
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
