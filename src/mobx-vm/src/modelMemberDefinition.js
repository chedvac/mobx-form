export default class ModelMemberDefinition {
  constructor(settings) {
    this.name = settings.name;
    this.defaultValue = settings.defaultValue;
    this.map = settings.map || {};
  }
}
