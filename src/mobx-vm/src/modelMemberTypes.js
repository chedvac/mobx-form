import { isObservableArray } from 'mobx';
import ModularViewModel from 'mobx-vm/modularViewModel';
import fail from 'utils/fail';

const message = {
  invalidType: 'model member invalid type'
};

export const enumeTypes = {
  modularViewModel: 1,
  array: 2,
  primitive: 3
};

//Todo check parimitive type and throw exceptioon
const isPrimitive = value => {
  return value;
  //typeof ? date, string, int, undefine, null,
};

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
