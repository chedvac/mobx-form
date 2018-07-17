import { observable, autorun, action, runInAction } from "mobx";
import formObservable from "./formObservable";
import ComplexType from "./ComplexType";
import request from "../networking/axiosWrapper";

class FormInformation extends ComplexType {
  constructor() {
    super();
    // this.set_isFormSent = this.set_isFormSent.bind(this);
  }
  @formObservable() isFormSent = false;
  @action
  set_isFormSent = function(value) {
    this.isFormSent = value;
  };
}

export default FormInformation;
