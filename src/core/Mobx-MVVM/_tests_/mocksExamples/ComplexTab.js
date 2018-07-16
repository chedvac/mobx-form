import ComplexType from 'core/ComplexType';
import formObservable from 'core/formObservable';
import modelProp1 from 'core/modelProp';
import { hebrew } from 'validations/rules/text';
import { maxlength } from 'validations/rules/basic';
// console.log(modelProp1.default);
const modelProp = modelProp1.default;
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
  }
  @modelProp()
  @formObservable({
    validations: [
      hebrew({
        message: () => {
          'hebrew only';
        }
      }),
      maxlength({ value: 5, message: () => 'too long...' })
    ]
  })
  agreement = '';
  @modelProp()
  @formObservable({
    validations: [
      hebrew({
        message: () => {
          'hebrew only';
        }
      }),
      maxlength({ value: 5, message: () => 'too long...' })
    ]
  })
  firstName = 'yael';
  @modelProp() complex;
}
