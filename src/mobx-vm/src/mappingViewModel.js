import { isObservableArray } from 'mobx';
import { forOwn } from 'lodash/fp';
import { find, forEach } from 'lodash';
import ModularViewModel from 'mobx-vm/modularViewModel';

const getMemberType = member => {
  if (member instanceof ModularViewModel) return 'ModularViewModel';
  if (isObservableArray(member)) return 'array';
  return 'default';
};

const isExistToMappingType = (modelMember, mappingType) => {
  return modelMember.map[mappingType] && modelMember.map[mappingType].to;
};

const mapToData = (data, modelMember, mappingType) => {
  if (isExistToMappingType(modelMember, mappingType)) {
    return modelMember.map[mappingType].to(data);
  }
  return data;
};

const getMapValue = (modelMember, item, mappingType) => {
  switch (getMemberType(item)) {
    case 'array': {
      return item.map(itemData => {
        const mappedItemData = itemData.toJSON(mappingType);
        return mapToData(mappedItemData, modelMember, mappingType);
      });
    }
    case 'ModularViewModel':
      return item;
    default: {
      return mapToData(item, modelMember, mappingType);
    }
  }
};
const getVMDataFromModelMembers = (data, mappingType) => {
  let jsonObj = {};
  forEach(data, (value, key) => {
    if (getMemberType(value) === 'ModularViewModel')
      value = value.toJSON(mappingType);
    Object.assign(jsonObj, { [key]: value });
  });
  return jsonObj;
};

const getDataFromModelMembers = (modelMember, mappingType) => {
  let jsonObj = {};
  forOwn(memberSettings => {
    const { name } = memberSettings;
    const value = getMapValue(memberSettings, modelMember[name], mappingType);
    Object.assign(jsonObj, { [name]: value });
  })(modelMember.modelMembersSettings);
  return jsonObj;
};

const isExistFromMappingType = (modelMember, mappingType) => {
  return modelMember.map[mappingType] && modelMember.map[mappingType].from;
};

const mapFromData = (data, modelMember, mappingType) => {
  if (isExistFromMappingType(modelMember, mappingType)) {
    return modelMember.map[mappingType].from(data);
  }
  return data;
};

const mapArrayByKey = (key, arrayData, modelMember, name, mappingType) => {
  forOwn(data => {
    const mappedData = mapFromData(
      data,
      modelMember.modelMembersSettings[name],
      mappingType
    );
    const itemFoundByKey = find(modelMember[name], item => {
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
    const mappedData = mapFromData(
      data,
      modelMember.modelMembersSettings[name],
      mappingType
    );
    const newItem = modelMember.getAddAction(name)();
    newItem.fromJSON(mappedData);
  })(arrayData);
};

const mapArray = (arrayData, modelMember, name, mappingType) => {
  if (
    isExistFromMappingType(modelMember.modelMembersSettings[name], mappingType)
  ) {
    const key = modelMember.modelMembersSettings[name].map[mappingType].key;
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
    if (data[name]) {
      switch (getMemberType(modelMember[name])) {
        case 'ModularViewModel':
          modelMember[name].fromJSON(data[name], mappingType);
          break;
        case 'array':
          mapArray(data[name], modelMember, name, mappingType);
          break;
        default: {
          const memberMapData = mapFromData(
            data[name],
            modelMember.modelMembersSettings[name],
            mappingType
          );
          modelMember.getAction(name)(memberMapData);
        }
      }
    }
  })(modelMember.modelMembersSettings);
};

export default {
  mapFromData,
  mapToData,
  setMappedDataToModelMembers,
  getDataFromModelMembers,
  mapArray,
  getVMDataFromModelMembers
};
