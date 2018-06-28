import ComplexType from "../../core/ComplexType";
import formObservable from "../../core/formObservable";
import modelProp from "../../core/modelProp";
import { hebrewName } from "../../validations/languages";
import { maxlength } from "../../validations/general";

import { initializeComplexProperties } from "../../core/complexPropertiesRegistration";

export class Complex extends ComplexType {
  constructor(settings) {
    super(settings);
  }
  @formObservable() inComplex = false;
}

export default class ComplexTab extends ComplexType {
  constructor(settings, register) {
    super(settings);
    this.complex = new Complex();
    if (register) {
      initializeComplexProperties(this);
    }
  }
  @modelProp()
  @formObservable({
    validations: [
      hebrewName({ message: "hebrew only" }),
      maxlength({ value: 5, message: "too long..." })
    ]
  })
  agreement = "";
  @modelProp()
  @formObservable({
    validations: [
      hebrewName({ message: "hebrew only" }),
      maxlength({ value: 5, message: "too long..." })
    ]
  })
  firstName = "yael";
  @modelProp() complex;
}
