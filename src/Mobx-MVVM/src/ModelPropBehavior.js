export default class ModelPropBehavior {
  constructor(property) {
    this.property = property;
    this.name = property.name;
  }
  map(value) {
    return typeof this.property.map === 'function'
      ? this.property.map(value)
      : value;
  }
  reset() {
    return typeof this.property.reset === 'function'
      ? this.property.reset(this.property.defaultValue)
      : this.property.descriptor.set(this.property.defaultValue);
  }
  setRef (ref) {//todo:rename
    this.ref = ref;
  }
}
