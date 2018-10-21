//TODO errorHandling
import { forOwn } from 'lodash/fp';
import _ from 'lodash';
import {
  enumeTypes as modelMemberTypes,
  getMemberType
} from './modelMemberTypes';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';

let mappingType, mappingMode;

const hasMappingRule = modelMember =>
  _.has(modelMember, `map.${mappingType}.${mappingMode}`);

const getMappingRule = modelMember => {
  const mappingRule = hasMappingRule(modelMember)
    ? modelMember.map[mappingType][mappingMode]
    : _.identity;
  return mappingRule;
};

const mapData = (data, modelMember) => {
  const mappingRule = getMappingRule(modelMember);
  return mappingRule(data);
};

const types = {
  [modelMemberTypes.modularViewModel]: {
    get: (modelMember, name) => modelMember[name].toJSON(mappingType),
    set: (data, modelMember, name) => {
      modelMember[name].fromJSON(data, mappingType);
    }
  },
  [modelMemberTypes.array]: {
    get: (modelMember, name) =>
      modelMember[name].map(itemData => {
        const mappedItemData = itemData.toJSON(mappingType);
        return mapData(mappedItemData, modelMember.modelMembers[name]);
      }),
    set: (data, modelMember, name) => {
      const mapArrayByKey = (key, arrayData, modelMember, name) => {
        forOwn(data => {
          const mappedData = mapData(data, modelMember.modelMembers[name]);
          const itemFoundByKey = _.find(
            modelMember[name],
            item => item[key].tostring() === mappedData[key].tostring()
          );
          if (itemFoundByKey) {
            setMappedDataToModelMembers(mappedData, itemFoundByKey);
          }
        })(arrayData);
      };

      const mapArrayByAdd = (arrayData, modelMember, name) => {
        modelMember[name].clear();
        forOwn(data => {
          const mappedData = mapData(data, modelMember.modelMembers[name]);
          const newItem = modelMember.getAddAction(name)();
          newItem.fromJSON(mappedData);
        })(arrayData);
      };

      const mapArrayByMappingRule = (arrayData, modelMember, name) => {
        const { key } = modelMember.modelMembers[name].map[mappingType];
        if (key) {
          mapArrayByKey(key, arrayData, modelMember, name);
        } else {
          mapArrayByAdd(arrayData, modelMember, name);
        }
      };

      const mapArray = (arrayData, modelMember, name) => {
        if (hasMappingRule(modelMember.modelMembers[name])) {
          mapArrayByMappingRule(arrayData, modelMember, name);
        } else {
          modelMember[name].clear();
          forOwn(data => {
            const newItem = modelMember.getAddAction(name)();
            newItem.fromJSON(data);
          })(arrayData);
        }
      };

      mapArray(data, modelMember, name);
    }
  },
  [modelMemberTypes.primitive]: {
    get: (modelMember, name) =>
      mapData(modelMember[name], modelMember.modelMembers[name]),
    set: (data, modelMember, name) => {
      const memberMapData = mapData(data, modelMember.modelMembers[name]);
      modelMember.getAction(name)(memberMapData);
    }
  }
};

const getDataFromModelMembers = modelMember => {
  const mappedModelMembers = {};
  forOwn(memberSettings => {
    const { name } = memberSettings;
    const memberType = getMemberType(modelMember[name]);
    const value = types[memberType].get(modelMember, name);
    Object.assign(mappedModelMembers, { [name]: value });
  })(modelMember.modelMembers);
  return mappedModelMembers;
};

const setMappedDataToModelMembers = (data, modelMember) => {
  forOwn(memberSettings => {
    const { name } = memberSettings;
    if (_.has(data, name)) {
      const memberType = getMemberType(modelMember[name]);
      types[memberType].set(data[name], modelMember, name);
    }
  })(modelMember.modelMembers);
};

const fromJSON = assertParametersType(
  {
    data: PropTypes.object.isRequired,
    modelMember: PropTypes.object.isRequired,
    type: PropTypes.string
  },
  (data, modelMember, type) => {
    mappingType = type;
    mappingMode = 'from';
    const mappedData = mapData(data, modelMember);
    setMappedDataToModelMembers(mappedData, modelMember);
  }
);

const toJSON = assertParametersType(
  {
    modelMember: PropTypes.object.isRequired,
    type: PropTypes.string
  },
  (modelMember, type) => {
    mappingType = type;
    mappingMode = 'to';
    const memberData = getDataFromModelMembers(modelMember);
    return mapData(memberData, modelMember);
  }
);

export default {
  fromJSON,
  toJSON
};
