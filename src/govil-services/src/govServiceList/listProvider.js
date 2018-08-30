import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import govServiceListRequest from '../govServiceList/services';

const defaultSettings = {
  method: 'POST'
};

const methodsNames = {
  getList: 'GetList',
  IsExistItem: 'IsExistItem',
  getFirstItem: 'GetFirstItem',
  getAsEntityBase: 'GetAsEntityBase',
  getLists: 'GetLists',
  getEntityBaseLists: 'GetAsEntityBaseLists'
};

const createRequest = function(data, methodName, settings) {
  const requestSettings = Object.assign({}, defaultSettings, settings);
  requestSettings.route = `ListProvider/${methodName}`;
  requestSettings.data = data;
  return govServiceListRequest(requestSettings);
};

/**
 * @method getList
 * @description Get List from ListProvider controller
 * @memberof listProvider
 * @param {object} data - params of getList function
 * @param {object} data.listName
 * @param {array} [data.filters]
 * @param {string} [data.filters.key]
 * @param {string} [data.filters.value]
 * @param {string} [data.sortColumn]
 * @param {object} [settings] - settings of ajax rquest , for example method
 * @returns {object} a promise object of the request
 * @example Example of usage
 * listProvider.getList({ listName: 'City' });
 */

export const getList = assertParametersType(
  {
    data: PropTypes.shape({
      listName: PropTypes.string.isRequired
    })
  },
  function getList(data, settings = {}) {
    return createRequest(data, methodsNames.getList, settings);
  }
);

/**
 * @method getLists
 * @memberof listProvider
 * @description Get List of lists from ListProvider controller
 * @param {object} data - params of getLists function
 * @param {object} data.paramsList
 * @param {object} data.paramsList.listName
 * @param {array} [data.paramsList.filters]
 * @param {string} [data.paramsList.filters.key]
 * @param {string} [data.paramsList.filters.value]
 * @param {string} [data.paramsList.sortColumn]
 * @param {object} [settings] - settings of ajax request , for example method
 * @returns {object} a promise object of the request
 * @example Example of usage
 * listProvider.getLists({ paramsList: [{ listName: 'City', filters: [{ key: 'city_code', value: '1278' }] }, { listName: 'City' }] });
 */

export const getLists = assertParametersType(
  {
    data: PropTypes.shape({
      paramsList: PropTypes.arrayOf(
        PropTypes.shape({
          listName: PropTypes.string.isRequired
        })
      ).isRequired
    })
  },
  function getLists(data, settings = {}) {
    return createRequest(data, methodsNames.getLists, settings);
  }
);

/**
 * @memberof lisProvider
 * @method getEntityBase
 * @description Get List as entityBase from ListProvider controller
 * @param {object} data - params of getEntityBase function
 * @param {object} data.listName 
 * @param {string} data.dataCodeColumn - name of column as dataCode
 * @param {string} data.dataTextColumn - name of column as dataText
 * @param {array} [data.filters]   
 * @param {string} [data.filters.key]
 * @param {string} [data.filters.value] 
 * @param {string} [data.sortColumn=dataTextColumn] 
 * @param {object} [settings] - settings of ajax rquest , for example method 
 * @returns {object} a promise object of the request
 * @example Example of usage 
 * listProvider.getEntityBase( {
  filters: [{ key: 'MegishPniyaCode', value: model.selectedSubject.dataCode }],
  listName: 'PniotSubjects',
  dataTextColumn: 'NosePniyaText',
  dataCodeColumn: 'NosePniyaCode'
});
*/

export const getEntityBase = assertParametersType(
  {
    data: PropTypes.shape({
      dataCodeColumn: PropTypes.string.isRequired,
      dataTextColumn: PropTypes.string.isRequired,
      listName: PropTypes.string.isRequired
    })
  },
  function getEntityBase(data, settings = {}) {
    return createRequest(data, methodsNames.getAsEntityBase, settings);
  }
);

/**
 * @memberof lisProvider
 * @method getEntityBaseLists
 * @description Get List of lists as entityBase from ListProvider controller
 * @param {object} data - params of getEntityBaseLists function
 * @param {object} data.paramsList 
 * @param {object} data.paramsList.listName 
 * @param {string} data.paramsList.dataCodeColumn - name of column as dataCode
 * @param {string} data.paramsList.dataTextColumn - name of column as dataText
 * @param {array} [data.paramsList.filters]   
 * @param {string} [data.paramsList.filters.key]
 * @param {string} [data.filters.paramsList.value]  
 * @param {string} [data.paramsList.sortColumn=dataTextColumn]              
 * @param {object} settings - settings of ajax rquest , for example method 
 * @returns {object} a promise object of the request
 * @example Example of usage 
 * listProvider.getEntityBaseLists({ 
   paramsList: [
   { listName: 'City', 
      dataCodeColumn: 'city_code', 
      dataTextColumn: 'city_name_he', 
      filters: [{ key: 'city_code', value: '1278' }] },
    { listName: 'City', 
      dataCodeColumn: 'city_code', 
      dataTextColumn: 'city_name_en' }] });
*/

export const getEntityBaseLists = assertParametersType(
  {
    data: PropTypes.shape({
      paramsList: PropTypes.arrayOf(
        PropTypes.shape({
          dataCodeColumn: PropTypes.string.isRequired,
          dataTextColumn: PropTypes.string.isRequired,
          listName: PropTypes.string.isRequired
        })
      ).isRequired
    })
  },
  function getEntityBaseLists(data, settings = {}) {
    return createRequest(data, methodsNames.getEntityBaseLists, settings);
  }
);

/**
 * @memberof lisProvider
 * @method getFirstItem
 * @description Get List from ListProvider controller
 * @param {object} data - params of getFirstItem function
 * @param {object} data.listName
 * @param {array} [data.filters]
 * @param {string} [data.filters.key]
 * @param {string} [data.filters.value]
 * @param {object} [settings] - settings of ajax rquest , for example method
 * @returns {object} a promise object of the request
 * @example Example of usage
 * listProvider.getFirstItem({ listName: 'City' });
 */

export const getFirstItem = assertParametersType(
  {
    data: PropTypes.shape({
      listName: PropTypes.string.isRequired
    })
  },
  function getFirstItem(data, settings = {}) {
    return createRequest(data, methodsNames.getFirstItem, settings);
  }
);

/**
 * @memberof lisProvider
 * @method IsExistItem
 * @description Get List as entityBase from ListProvider controller
 * @param {object} data - params of IsExistItem function
 * @param {object} data.listName
 * @param {array} data.filters
 * @param {string} data.filters.key
 * @param {string} data.filters.value
 * @param {object} settings - settings of ajax rquest , for example method
 * @returns {object} a promise object of the request
 * @example Example of usage
 * listProvider.IsExistItem( {listName: 'PniotSubjects', filters: [{ key: 'MegishPniyaCode', value: model.selectedSubject.dataCode }]});
 */

export const IsExistItem = assertParametersType(
  {
    data: PropTypes.shape({
      filters: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
      ).isRequired,
      listName: PropTypes.string.isRequired
    })
  },
  function IsExistItem(data, settings = {}) {
    return createRequest(data, methodsNames.IsExistItem, settings);
  }
);
