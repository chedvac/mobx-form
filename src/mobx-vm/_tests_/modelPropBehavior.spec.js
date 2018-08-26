import ModelPropBehavior from 'core/modelPropBehavior';

let modelProp;
beforeAll(() => {
  modelProp = new ModelPropBehavior();
});
describe('ModelPropBehavior', () => {
  describe('define properties:', () => {
    test('setReset', () => {
      expect(modelProp.setReset).toBeDefined();
    });

    test('setMap', () => {
      expect(modelProp.setMap).toBeDefined();
    });
    
  });
  describe('logic:', () => {
    test('setReset', () => {
      const reset = () => {};
      modelProp.setReset(reset);
      expect(modelProp.reset).toBe(reset);
    });
    test('setMap', () => {
      const map = () => {};
      modelProp.setMap(map);
      expect(modelProp.map).toBe(map);
    });
   
  });
});
