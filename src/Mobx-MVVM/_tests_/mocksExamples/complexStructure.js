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
    setValidateableProperty: jest.fn()
  },
  _propertiesInitialized: false,
  _properties: {
    firstName: {
      name: 'firstName',
      descriptor,
      validationsManager: {}
    },
    lastName: {
      descriptor,
      validationsManager: {},
      name: 'lastName'
    },
    address: {
      descriptor,
      validationsManager: {},
      name: 'address'
    }
  }
};
