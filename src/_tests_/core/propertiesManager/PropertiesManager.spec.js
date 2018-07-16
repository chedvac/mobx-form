import PropertiesManager from 'core/PropertiesManager/PropertiesManager';
import ModelPropBehavior from 'core/PropertiesManager/ModelPropBehavior';

let propertiesManager1;
let newProperty;
beforeEach(() => {
  propertiesManager1 = new PropertiesManager();
});
beforeAll(() => {
  newProperty = new ModelPropBehavior();
});
describe('PropertiesManager', () => {
  test('properties is private', () => {
    expect(propertiesManager1.properties).not.toBeDefined();
  });

  test('getProperties function exist', () => {
    expect(typeof propertiesManager1.getProperties).toBe('function');
  });
  test('createProperty function exist', () => {
    expect(typeof propertiesManager1.createProperty).toBe('function');
  });
  test('getProperty function exist', () => {
    expect(typeof propertiesManager1.getProperty).toBe('function');
  });

  describe('getProperties -', () => {
    beforeEach(() => {
      propertiesManager1.createProperty('firstName',newProperty);
    });
    test('return property by name', () => {
      expect(
        propertiesManager1.getProperty('firstName')).toBeDefined();
    });
    test('throw if property not exist', () => {
      expect(() => {
        propertiesManager1.getProperty('lastName');
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        propertiesManager1.getProperty({});
      }).toThrow();
    });
  });

  describe('createProperty -', () => {
    test('throw if propertyName not string', () => {
      expect(() => {
        propertiesManager1.createProperty({}, newProperty);
      }).toThrow();
    });
    test('throw if propertyName not instanceOf FormObservableBehavior or ModelPropBehavior', () => {
      expect(() => {
        propertiesManager1.createProperty('firstName', {});
      }).toThrow();
    });
    test('throw if properties already contains this propertyName', () => {
      propertiesManager1.createProperty('firstName', newProperty);
      expect(() => {
        propertiesManager1.createProperty('firstName', newProperty);
      }).toThrow();
    });
    test('add new property to properties', () => {
      propertiesManager1.createProperty('firstName', newProperty);
      expect(propertiesManager1.getProperty('firstName')).toBeDefined();
    });

    test('put reference on the class', () => {
      propertiesManager1.createProperty('firstName', newProperty);
      expect(
        propertiesManager1.firstName instanceof ModelPropBehavior
      ).toBeTruthy();
    });
  });
  describe('getProperties -', () => {
    test('return properties', () => {
      propertiesManager1.createProperty('firstName', newProperty);
      propertiesManager1.createProperty('lastName', newProperty);
      expect(propertiesManager1.getProperties()).toEqual(
        expect.objectContaining({
          firstName: expect.any(ModelPropBehavior),
          lastName: expect.any(ModelPropBehavior)
        })
      );
    });
  });
});
