import ComplexType from 'core/complexType';
import validateableObservable from 'core/validateableObservable';
import modelProp1 from 'core/modelProp';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';
// console.log(modelProp1.default);
const modelProp = modelProp1.default;
export class Complex extends ComplexType {
  constructor(settings) {
    super(settings);
  }
  @validateableObservable() inSubComplex = false;
}

export default class ComplexTab extends ComplexType {
  constructor(settings, register) {
    super(settings);
    this.subComplex = new Complex();
  }
  @modelProp()
  @validateableObservable({
    validations: [
      hebrew(),
      maxlength({ value: 5})
    ]
  })
  agreement = '';
  @modelProp()
  @validateableObservable({
    validations: [
      hebrew(),
      maxlength({ value: 5})
    ]
  })
  firstName = 'יעל';
  @modelProp() subComplex;
}
