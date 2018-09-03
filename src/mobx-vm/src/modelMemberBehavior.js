export default class ModelMemberBehavior {
  constructor(settings) {
    this.name = settings.name;
    this.defaultValue = settings.defaultValue;
    this.resetfn = settings.reset;
    this.map = settings.map;
  }
  map(value) {
    return typeof this.map === 'function' ? this.map(value) : value;
  }
  reset() {
    return typeof this.resetfn === 'function'
      ? this.reset(this.defaultValue)
      : this.descriptor.set(this.defaultValue);
  }
}
