import services from '../services';
import Exception from '../../core/exeptions';

const defaultSettings = {
  method: 'POST',
  dataType: 'json'
};

const methodsNames = {
  getList: 'GetList',
  IsExistItem: 'IsExistItem',
  getFirstItem: 'GetFirstItem',
  getAsEntityBase: 'GetAsEntityBase',
  getLists: 'GetLists',
  getEntityBaseLists: 'GetAsEntityBaseLists'
};

const validator = (function() {
  const validateListName = function(data, methodname) {
    if (!data.listName) {
      throw new Exception(
        `missing required param listName in ${methodname} function (listProvider module)`
      );
    }
  };
  const validateEntityBase = function(data, methodname) {
    if (!data.dataCodeColumn) {
      throw new Exception(
        `missing required param dataCodeColumn, listName: ${
          data.listName
        } in ${methodname} function (listProvider module)`
      );
    }
    if (!data.dataTextColumn) {
      throw new Exception(
        `missing required param dataTextColumn, listName: ${
          data.listName
        }. in ${methodname} function (listProvider module)`
      );
    }
    validateListName(data, methodname);
  };
  const validateFilters = function(data, methodname) {
    if (!data.filters) {
      throw new Exception(
        `missing required param filters, listName: ${
          data.listName
        }, in ${methodname} function (listProvider module)`
      );
    }
    validateListName(data, methodname);
  };
  const validateEntityBaseLists = function(data, methodname) {
    if (!data.paramsList) {
      throw new Exception(
        `missing required param paramsList in ${methodname} function (listProvider module)`
      );
    }
    data.paramsList.forEach(params => {
      validateEntityBase(params, methodname);
    });
  };
  const validateLists = function(data, methodname) {
    if (!data.paramsList) {
      throw new Exception(
        `missing required param paramsList in ${methodname} function (listProvider module)`
      );
    }
    data.paramsList.forEach(params => {
      validateListName(params, methodname);
    });
  };
  return {
    validateListName,
    validateEntityBase,
    validateFilters,
    validateEntityBaseLists,
    validateLists
  };
})();

const createRequest = function(data, methodName, settings) {
  const requestSettings = Object.assign({}, defaultSettings, settings);
  requestSettings.route = `ListProvider/${methodName}`;
  requestSettings.data = data;
  return services.govServiceListRequest(requestSettings);
};

const getList = function(data, settings = {}) {
  validator.validateListName(data, methodsNames.getList);
  return createRequest(data, methodsNames.getList, settings);
};

const getLists = function(data, settings = {}) {
  validator.validateLists(data, methodsNames.getLists);
  return createRequest(data, methodsNames.getLists, settings);
};

const getEntityBase = function(data, settings = {}) {
  validator.validateEntityBase(data, methodsNames.getAsEntityBase);
  return createRequest(data, methodsNames.getAsEntityBase, settings);
};

const getEntityBaseLists = function(data, settings = {}) {
  validator.validateEntityBaseLists(data, methodsNames.getEntityBaseLists);
  return createRequest(data, methodsNames.getEntityBaseLists, settings);
};

const getFirstItem = function(data, settings = {}) {
  validator.validateListName(data, methodsNames.getFirstItem);
  return createRequest(data, methodsNames.getFirstItem, settings);
};

const IsExistItem = function(data, settings = {}) {
  validator.validateFilters(data, methodsNames.IsExistItem);
  return createRequest(data, methodsNames.IsExistItem, settings);
};

export default {
  getList,
  getLists,
  getEntityBase,
  getEntityBaseLists,
  getFirstItem,
  IsExistItem
};
