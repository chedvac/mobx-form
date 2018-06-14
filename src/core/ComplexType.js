import { observable } from "mobx";
import validationsManagerFactory from "../validations/validationsManager";

export default class ComplexType {
  @observable isValid = true;
  @observable message = "";
  constructor(settings = {}) {
    this.propertiesManager = {};
    this.model = {};
    this.message = "";
    this.isValid = true;
    this.validationsManager = new validationsManagerFactory(
      settings.validations
    );

    ///add volatile views actions
    this.initialProperty = this.initialProperty.bind(this);
    this.validate = this.validate.bind(this);
    this.getDeepModel = this.getDeepModel.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getPureModel = this.getPureModel.bind(this);
    this.map = this.map.bind(this);
    this.reset = this.reset.bind(this);
  }

  getDeepModel(prop) {
    return prop.getPureModel ? prop.getPureModel() : prop.getValue();
  }
  initialProperty(propertyName, value, actions) {
    if (typeof value === "object") {
      actions = {
        validate: value.validate,
        map: value.map,
        reset: value.reset,
        validationsManager: value.validationsManager
      };
    }
    this.model[propertyName] = value;
    this.propertiesManager[propertyName] = {
      ...actions,
      @observable message: "",
      @observable isValid: ""
    };
  }

  applyChildAction(action) {
    //todo private
    const propertiesManager = this.propertiesManager;
    if (propertiesManager) {
      Object.keys(propertiesManager).forEach(function(key) {
        propertiesManager[key][action]();
      });
    }
  }

  validate() {
    var self = this;
    const validateChildren = () => {
      let childrenIsValid = true;
      const propertiesManager = self.propertiesManager;
      if (propertiesManager) {
        Object.keys(propertiesManager).forEach(function(key) {
          if (!propertiesManager[key].validate(self, self.model[key])) {
            childrenIsValid = false;
          }
        });
      }
      return childrenIsValid;
    };

    let validationResult = this.validationsManager.validate(this);
    this.message = validationResult.message;
    const childrenIsValid = validateChildren();
    this.isValid = validationResult.isValid ? childrenIsValid : validationResult.isValid;

    return this.isValid;
  }
  getModel() {
    return this.model;
  }
  getPureModel() {
    var pureModel = {};
    var model = this.model;
    for (var prop in model) {
      if (model.hasOwnProperty(prop) && !model[prop].ignore) {
        pureModel[prop] = this.getDeepModel(model[prop]);
      }
    }
    return pureModel;
  }
  // setModel : function(){
  //     type.model
  //     //map
  // },

  //TODO fromSnapshot , to Snapshot
  map() {}
  reset() {
    this.applyChildAction("reset");
  }
}
