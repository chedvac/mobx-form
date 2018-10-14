//TODO errorHandling
import { forOwn } from 'lodash/fp';
import _ from 'lodash';
import {
  enumeTypes as modelMemberTypes,
  getMemberType
} from './modelMemberTypes';

const identity = data => data;

const hasMappingRule = (modelMember, mappingType, mode) =>
  modelMember.map[mappingType] && modelMember.map[mappingType][mode];

const getMappingRule = (modelMember, mappingType, mode) => {
  return hasMappingRule(modelMember, mappingType, mode)
    ? modelMember.map[mappingType][mode]
    : identity;
};

const mapData = (data, modelMember, mappingType, mode) => {
  const mappingRule = getMappingRule(modelMember, mappingType, mode);
  return mappingRule(data);
};

const getMapValue = (modelMember, item, mappingType) => {
  switch (getMemberType(item)) {
    case modelMemberTypes.array: {
      return item.map(itemData => {
        const mappedItemData = itemData.toJSON(mappingType);
        return mapData(mappedItemData, modelMember, mappingType, 'to');
      });
    }
    case modelMemberTypes.modularViewModel:
      return item.toJSON(mappingType);
    default: {
      return mapData(item, modelMember, mappingType, 'to');
    }
  }
};

const getDataFromModelMembers = (modelMember, mappingType) => {
  const mappedModelMembers = {};
  forOwn(memberSettings => {
    const { name } = memberSettings;
    const value = getMapValue(memberSettings, modelMember[name], mappingType);
    Object.assign(mappedModelMembers, { [name]: value });
  })(modelMember.modelMembers);
  return mappedModelMembers;
};

const mapArrayByKey = (key, arrayData, modelMember, name, mappingType) => {
  forOwn(data => {
    const mappedData = mapData(
      data,
      modelMember.modelMembers[name],
      mappingType,
      'from'
    );
    const itemFoundByKey = _.find(modelMember[name], item => {
      return item[key].tostring() === mappedData[key].tostring();
    });
    if (itemFoundByKey) {
      setMappedDataToModelMembers(mappedData, itemFoundByKey, mappingType);
    }
  })(arrayData);
};

const mapArrayByAdd = (arrayData, modelMember, name, mappingType) => {
  modelMember[name].clear();
  forOwn(data => {
    const mappedData = mapData(
      data,
      modelMember.modelMembers[name],
      mappingType,
      'from'
    );
    const newItem = modelMember.getAddAction(name)();
    newItem.fromJSON(mappedData);
  })(arrayData);
};

const mapArray = (arrayData, modelMember, name, mappingType) => {
  if (hasMappingRule(modelMember.modelMembers[name], mappingType, 'from')) {
    const { key } = modelMember.modelMembers[name].map[mappingType];
    if (key) {
      mapArrayByKey(key, arrayData, modelMember, name, mappingType);
    } else {
      mapArrayByAdd(arrayData, modelMember, name, mappingType);
    }
  } else {
    modelMember[name].clear();
    forOwn(data => {
      const newItem = modelMember.getAddAction(name)();
      newItem.fromJSON(data);
    })(arrayData);
  }
};

const setMappedDataToModelMembers = (data, modelMember, mappingType) => {
  forOwn(memberSettings => {
    const { name } = memberSettings;
    if (_.has(data, name)) {
      switch (getMemberType(modelMember[name])) {
        case modelMemberTypes.modularViewModel:
          modelMember[name].fromJSON(data[name], mappingType);
          break;
        case modelMemberTypes.array:
          mapArray(data[name], modelMember, name, mappingType);
          break;
        default: {
          const memberMapData = mapData(
            data[name],
            modelMember.modelMembers[name],
            mappingType,
            'from'
          );
          modelMember.getAction(name)(memberMapData);
        }
      }
    }
  })(modelMember.modelMembers);
};

export default {
  mapData,
  setMappedDataToModelMembers,
  getDataFromModelMembers,
  mapArray
};
