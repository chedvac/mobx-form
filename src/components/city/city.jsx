import React from 'react';
import { observer } from 'mobx-react';
import { action, observable, runInAction, flow } from 'mobx';
import Select from 'react-ui-components/fields/Select';
import request from 'utils/serviceRequest';
import qs from 'qs';

@observer
export default class City extends React.Component {
  @observable
  cityList = [];

  constructor(props) {
    super(props);

    this.texts = {
      selectLanguage: { hebrew: 'בחר', english: 'select', arabic: '' }
    };
    // this.loadCityList = this.loadCityList.bind(this);
    this.loadCityList();
  }
  loadCityList = flow(function*() {
    try {
      const response = yield request({
        url:
          'http://formsdev.vcloud.gov.il/govservicelist/ListProvider/GetList',
        method: 'POST',
        data: qs.stringify({ listName: 'City' })
      });
      this.cityList = response.data.Data.List.map(item => ({
        key: item.city_code,
        value: item.city_name_he
      }));
    } catch (error) {
      console.log(error);
    }
  });
  // @action
  // loadCityList = async function(){
  //     const response = await request({url: 'http://formsdev.vcloud.gov.il/govservicelist/ListProvider/GetList', method: 'POST', data: qs.stringify({listName: 'City'})})
  //     const self = this;
  //     runInAction(()=>{
  //         self.cityList = response.data.Data.List.map(item => ({key: item.city_code, value: item.city_name_he}));
  //     })
  // }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <Select
            options={this.cityList}
            {...this.props}
            label={
              this.texts.selectLanguage[
                this.props.applicationData.formLanguage.languageName
              ]
            }
          />
        </div>
      </div>
    );
  }
}
