import {
  hebrew,
  english,
  hebrewNumber,
  noHebrewLetters,
  englishNumber,
  englishExtended,
  englishHebrew,
  englishHebrewNumber,
  fileName,
  startWithDigit,
  noApostrophe,
  freeText,freeHebrew
} from '../../rules/text';
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
      describe('validator hebrew rule', () => {
        test('value valid', () => {
          expect(hebrewRule.validator('רקןכו')).toBeTruthy();
          expect(hebrewRule.validator('רו ירקןכו')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(hebrewRule.validator('רו 1231ירקןכו')).toBeFalsy();
          expect(hebrewRule.validator('ארט- ארט ?ר:ט;א')).toBeFalsy();
          expect(hebrewRule.validator(' טאר טארvfd')).toBeFalsy();
        });
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
      describe('validator english rule', () => {
        test('value valid', () => {
          expect(englishRule.validator('abc bca')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(englishRule.validator('fifty five 55')).toBeFalsy();
          expect(englishRule.validator('fifty five!!')).toBeFalsy();
          expect(englishRule.validator(' טאר טארvfd')).toBeFalsy();
        });
      });
    });
  });

  describe('hebrewNumber', () => {
    test('shuold be defined', () => {
      expect(hebrewNumber).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          hebrewNumber();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(hebrewNumber, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let hebrewNumberRule;
      beforeEach(() => {
        hebrewNumberRule = hebrewNumber();
      });
      test('should return object', () => {
        expect(typeof hebrewNumberRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(hebrewNumberRule.name).toBeDefined();
        expect(hebrewNumberRule.message).toBeDefined();
        expect(hebrewNumberRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof hebrewNumberRule.message).toBe('function');
        expect(typeof hebrewNumberRule.validator).toBe('function');
      });
      describe('validator hebrewNumber rule', () => {
        test('value valid', () => {
          expect(hebrewNumberRule.validator('א בג7')).toBeTruthy();
          expect(hebrewNumberRule.validator('אבג7')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(hebrewNumberRule.validator('ארט- א92רט ?ר:ט;א')).toBeFalsy();
          expect(hebrewNumberRule.validator(' ט14אר טארvfd')).toBeFalsy();
        });
      });
    });
  });

  describe('noHebrewLetters', () => {
    test('shuold be defined', () => {
      expect(noHebrewLetters).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          noHebrewLetters();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(noHebrewLetters, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let noHebrewLettersRule;
      beforeEach(() => {
        noHebrewLettersRule = noHebrewLetters();
      });
      test('should return object', () => {
        expect(typeof noHebrewLettersRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(noHebrewLettersRule.name).toBeDefined();
        expect(noHebrewLettersRule.message).toBeDefined();
        expect(noHebrewLettersRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof noHebrewLettersRule.message).toBe('function');
        expect(typeof noHebrewLettersRule.validator).toBe('function');
      });
      describe('validator noHebrewLetters rule', () => {
        test('value valid', () => {
          expect(noHebrewLettersRule.validator('grh@$!~," ;+')).toBeTruthy();
          expect(noHebrewLettersRule.validator('grh 4545')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(noHebrewLettersRule.validator('grhכית')).toBeFalsy();
        });
      });
    });
  });

  describe('englishNumber', () => {
    test('shuold be defined', () => {
      expect(englishNumber).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          englishNumber();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(englishNumber, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let englishNumberRule;
      beforeEach(() => {
        englishNumberRule = englishNumber();
      });
      test('should return object', () => {
        expect(typeof englishNumberRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(englishNumberRule.name).toBeDefined();
        expect(englishNumberRule.message).toBeDefined();
        expect(englishNumberRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof englishNumberRule.message).toBe('function');
        expect(typeof englishNumberRule.validator).toBe('function');
      });
      describe('validator englishNumber rule', () => {
        test('value valid', () => {
          expect(englishNumberRule.validator('ss56 66')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(englishNumberRule.validator('arbitrary #!')).toBeFalsy();
          expect(englishNumberRule.validator('arbitrary שרירותי')).toBeFalsy();
        });
      });
    });
  });

  describe('englishExtended', () => {
    test('shuold be defined', () => {
      expect(englishExtended).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          englishExtended();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(englishExtended, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let englishExtendedRule;
      beforeEach(() => {
        englishExtendedRule = englishExtended();
      });
      test('should return object', () => {
        expect(typeof englishExtendedRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(englishExtendedRule.name).toBeDefined();
        expect(englishExtendedRule.message).toBeDefined();
        expect(englishExtendedRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof englishExtendedRule.message).toBe('function');
        expect(typeof englishExtendedRule.validator).toBe('function');
      });
      describe('validator englishExtended rule', () => {
        test('value valid', () => {
          expect(englishExtendedRule.validator('arGb15')).toBeTruthy();
          expect(englishExtendedRule.validator('!-arGb-!')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(englishExtendedRule.validator(' ט14אר ט$ארvfd')).toBeFalsy();
        });
      });
    });
  });

  describe('englishHebrew', () => {
    test('shuold be defined', () => {
      expect(englishHebrew).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          englishHebrew();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(englishHebrew, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let englishHebrewRule;
      beforeEach(() => {
        englishHebrewRule = englishHebrew();
      });
      test('should return object', () => {
        expect(typeof englishHebrewRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(englishHebrewRule.name).toBeDefined();
        expect(englishHebrewRule.message).toBeDefined();
        expect(englishHebrewRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof englishHebrewRule.message).toBe('function');
        expect(typeof englishHebrewRule.validator).toBe('function');
      });
      describe('validator englishHebrew rule', () => {
        test('value valid', () => {
          expect(englishHebrewRule.validator('arGbאאב')).toBeTruthy();
          expect(englishHebrewRule.validator('arGb- -אאב')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(englishHebrewRule.validator('arGb15רר')).toBeFalsy();
          expect(englishHebrewRule.validator('#-arGb-$')).toBeFalsy();
        });
      });
    });
  });

  describe('englishHebrewNumber', () => {
    test('shuold be defined', () => {
      expect(englishHebrewNumber).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          englishHebrewNumber();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(englishHebrewNumber, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let englishHebrewNumberRule;
      beforeEach(() => {
        englishHebrewNumberRule = englishHebrewNumber();
      });
      test('should return object', () => {
        expect(typeof englishHebrewNumberRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(englishHebrewNumberRule.name).toBeDefined();
        expect(englishHebrewNumberRule.message).toBeDefined();
        expect(englishHebrewNumberRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof englishHebrewNumberRule.message).toBe('function');
        expect(typeof englishHebrewNumberRule.validator).toBe('function');
      });
      describe('validator englishHebrewNumber rule', () => {
        test('value valid', () => {
          expect(englishHebrewNumberRule.validator('arGb123אאב')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(englishHebrewNumberRule.validator('#-arGb-$')).toBeFalsy();
        });
      });
    });
  });

  describe('fileName', () => {
    test('shuold be defined', () => {
      expect(fileName).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          fileName();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(fileName, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let fileNameRule;
      beforeEach(() => {
        fileNameRule = fileName();
      });
      test('should return object', () => {
        expect(typeof fileNameRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(fileNameRule.name).toBeDefined();
        expect(fileNameRule.message).toBeDefined();
        expect(fileNameRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof fileNameRule.message).toBe('function');
        expect(typeof fileNameRule.validator).toBe('function');
      });
      describe('validator fileName rule', () => {
        test('value valid', () => {
          expect(fileNameRule.validator('ttt.ff')).toBeTruthy();
          expect(fileNameRule.validator('אכאכ.ff')).toBeTruthy();
          expect(fileNameRule.validator('t.tt.ff')).toBeTruthy();
          expect(fileNameRule.validator('ttt,ff')).toBeTruthy();
          expect(fileNameRule.validator('1243.ff')).toBeTruthy();
          expect(fileNameRule.validator('ttt{}}ff')).toBeTruthy();
          expect(fileNameRule.validator('ttt())ff')).toBeTruthy();
          expect(fileNameRule.validator('t#t.ff')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(fileNameRule.validator('rer>rr')).toBeFalsy();
          expect(fileNameRule.validator('fff<Fff')).toBeFalsy();
          expect(fileNameRule.validator('dd?dd')).toBeFalsy();
          expect(fileNameRule.validator('dd|ss')).toBeFalsy();
          expect(fileNameRule.validator('ss:dd')).toBeFalsy();
          expect(fileNameRule.validator('d/dd')).toBeFalsy();
          expect(fileNameRule.validator('d\\ddd')).toBeFalsy();
        });
      });
    });
  });

  describe('startWithDigit', () => {
    test('shuold be defined', () => {
      expect(startWithDigit).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          startWithDigit();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(startWithDigit, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let startWithDigitRule;
      beforeEach(() => {
        startWithDigitRule = startWithDigit();
      });
      test('should return object', () => {
        expect(typeof startWithDigitRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(startWithDigitRule.name).toBeDefined();
        expect(startWithDigitRule.message).toBeDefined();
        expect(startWithDigitRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof startWithDigitRule.message).toBe('function');
        expect(typeof startWithDigitRule.validator).toBe('function');
      });
      describe('validator startWithDigit rule', () => {
        test('value valid', () => {
          expect(startWithDigitRule.validator('2fg5fg')).toBeTruthy();
          expect(startWithDigitRule.validator('1254')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(startWithDigitRule.validator('gfgf')).toBeFalsy();
          expect(startWithDigitRule.validator('g445')).toBeFalsy();
        });
      });
    });
  });

  describe('noApostrophe', () => {
    test('shuold be defined', () => {
      expect(noApostrophe).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          noApostrophe();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(noApostrophe, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let noApostropheRule;
      beforeEach(() => {
        noApostropheRule = noApostrophe();
      });
      test('should return object', () => {
        expect(typeof noApostropheRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(noApostropheRule.name).toBeDefined();
        expect(noApostropheRule.message).toBeDefined();
        expect(noApostropheRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof noApostropheRule.message).toBe('function');
        expect(typeof noApostropheRule.validator).toBe('function');
      });
      describe('validator noApostrophe rule', () => {
        test('value valid', () => {
          expect(noApostropheRule.validator('2fg5fg')).toBeTruthy();
          expect(noApostropheRule.validator('2f!$&^()g5fg')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(noApostropheRule.validator("gf'gf")).toBeFalsy();
          expect(noApostropheRule.validator("'g445")).toBeFalsy();
        });
      });
    });
  });
/*
  describe('freeText', () => {
    test('shuold be defined', () => {
      expect(freeText).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          freeText();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(freeText, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let freeTextRule;
      beforeEach(() => {
        freeTextRule = freeText();
      });
      test('should return object', () => {
        expect(typeof freeTextRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(freeTextRule.name).toBeDefined();
        expect(freeTextRule.message).toBeDefined();
        expect(freeTextRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof freeTextRule.message).toBe('function');
        expect(typeof freeTextRule.validator).toBe('function');
      });
      describe('validator freeText rule', () => {
        test('min length', () => {
          expect(freeTextRule.validator('t')).toBeFalsy();
          expect(freeTextRule.validator('tt')).toBeTruthy();
        });
        test('finalLetters', () => {
          expect(freeTextRule.validator('בךכ')).toBeFalsy();
          expect(freeTextRule.validator('באך')).toBeTruthy();
          expect(freeTextRule.validator('כף.')).toBeTruthy();
          expect(freeTextRule.validator('אץ, ')).toBeTruthy();
          expect(freeTextRule.validator("אץ'")).toBeTruthy();
        });
        test('value valid', () => {
          expect(freeTextRule.validator('fdfds')).toBeTruthy();
          expect(freeTextRule.validator('כגגדכ432')).toBeTruthy();
          expect(freeTextRule.validator('432')).toBeTruthy();
          expect(freeTextRule.validator('ds/sf')).toBeTruthy();
          expect(freeTextRule.validator('dssf')).toBeTruthy();
          expect(freeTextRule.validator('ddsd\ndfsd')).toBeTruthy();
          expect(
            freeTextRule.validator('^([-.:,\'s_$@;=^?+![] *%# ()"]*)$*s')
          ).toBeTruthy();
        });
        test('value not valid', () => {
          expect(freeTextRule.validator('{}dsda}')).toBeFalsy();
          expect(freeTextRule.validator('ff&ff')).toBeFalsy();
          expect(freeTextRule.validator('<GG>')).toBeFalsy();
        });
      });
    });
  });

  describe('freeHebrew', () => {
    test('shuold be defined', () => {
      expect(freeHebrew).toBeDefined();
    });
    describe('params', () => {
      test('not throw if params not exist', () => {
        expect(() => {
          freeHebrew();
        }).not.toThrow();
      });
      describe('message', () => {
        test(
          'should throw if not func',
          testPropTypes(freeHebrew, 'message', 'func', { value: 2 })
        );
      });
    });
    describe('return params', () => {
      let freeHebrewRule;
      beforeEach(() => {
        freeHebrewRule = freeHebrew();
      });
      test('should return object', () => {
        expect(typeof freeHebrewRule).toBe('object');
      });
      test('should contain name, message, validator', () => {
        expect(freeHebrewRule.name).toBeDefined();
        expect(freeHebrewRule.message).toBeDefined();
        expect(freeHebrewRule.validator).toBeDefined();
      });
      test('message and validator should be function', () => {
        expect(typeof freeHebrewRule.message).toBe('function');
        expect(typeof freeHebrewRule.validator).toBe('function');
      });
      describe('validator freeHebrew rule', () => {
        test('value valid', () => {
          expect(freeHebrewRule.validator('שששש גגגגג')).toBeTruthy();
          expect(freeHebrewRule.validator('א888- בג7')).toBeTruthy();
          expect(freeHebrewRule.validator('(א:()בג7')).toBeTruthy();
        });
        test('value not valid', () => {
          expect(freeHebrewRule.validator('ארט- א92ר@#ט @רא')).toBeFalsy();
          expect(freeHebrewRule.validator('אב bbb')).toBeFalsy();
          expect(freeHebrewRule.validator('ddddd')).toBeFalsy();
        });
      });
    });
  });*/
});
