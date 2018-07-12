import { hebrew, english } from '../../rules/text';
import { testPropTypes } from '../common/testPropTypes';
describe('text rules', () => {
  describe('hebrew', () => {
    test('shuold be defined', () => {
      expect(hebrew).toBeDefined();
    });

    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          hebrew();
        }).not.toThrow();
      });

      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(hebrew, 'message', 'func', { value: 2 })
        );
        //test('success message params')
      });
    });

    describe('return params', () => {
      let hebrewRule;
      beforeEach(() => {
        hebrewRule = hebrew();
      });

      test('should return object', () => {
        expect(typeof hebrewRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(hebrewRule.name).toBeDefined();
        expect(hebrewRule.message).toBeDefined();
        expect(hebrewRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof hebrewRule.message).toBe('function');
        expect(typeof hebrewRule.validator).toBe('function');
      });
    });
  });

  describe('english', () => {
    test('shuold be defined', () => {
      expect(english).toBeDefined();
    });

    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          english();
        }).not.toThrow();
      });

      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(english, 'message', 'func', { value: 2 })
        );
        //test('success message params')
      });
    });

    describe('return params', () => {
      let englishRule;
      beforeEach(() => {
        englishRule = english();
      });

      test('should return object', () => {
        expect(typeof englishRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(englishRule.name).toBeDefined();
        expect(englishRule.message).toBeDefined();
        expect(englishRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof englishRule.message).toBe('function');
        expect(typeof englishRule.validator).toBe('function');
      });
    });
  });
});
