const target = {};
export const descriptor = (target,
'name',
{
  value: 42,
  writable: false
});
export default {
  propertiesManager: {
    createProperty: jest.fn(),
    setFormObservableProperty: jest.fn()
  },
  _propertiesInitialized: false,
  _properties: {
    firstName: {
      name: 'firstName',
      isModelProp: true,
      isFormObservable: true,
      descriptor,
      validationsManager: {}
    },
    lastName: {
      isModelProp: true,
      descriptor,
      validationsManager: {},
      name: 'lastName'
    },
    address: {
      isFormObservable: true,
      descriptor,
      validationsManager: {},
      nam: 'address'
    }
  }
};
