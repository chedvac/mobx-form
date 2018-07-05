import { observable, flow } from 'mobx';
import listProvider from './listProvider';

let cityList = observable([]);

const listParams = {
  listName: 'City',
  dataTextColumn: 'city_name_he',
  dataCodeColumn: 'city_code'
};

const loadCityList = flow(function*(cityList) {
  try {
    const response = yield listProvider.getEntityBase(listParams);
    cityList.replace(
      //response.data.Data.List
      response.data.Data.List.map(item => ({
        key: item.dataCode,
        value: item.dataText
      }))
    );
  } catch (error) {
    // dialog.alert({ message: resourceFetcher.get(indicatorsTexts.errors).callServiceError });
    console.log(error);
  }
});

loadCityList(cityList);

export default cityList;
