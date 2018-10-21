import { isObservableArray } from 'mobx';
import ModularViewModel from 'mobx-vm/modularViewModel';
import fail from 'utils/fail';
import _ from 'lodash';

const message = {
  invalidType: 'model member invalid type'
};

export const enumeTypes = {
  modularViewModel: 1,
  array: 2,
  primitive: 3 //simple leaf ?
};

//const primitiveType=['string','number','boolean','undefined';]

const isPrimitive = value => !_.isObject(value);
// _.includes(primitiveType,typeof value) || !value;

export const getMemberType = member => {
  if (member instanceof ModularViewModel) {
    return enumeTypes.modularViewModel;
  }
  if (isObservableArray(member)) {
    return enumeTypes.array;
  }
  if (isPrimitive(member)) {
    return enumeTypes.primitive;
  }
  return fail(message.invalidType);
};
