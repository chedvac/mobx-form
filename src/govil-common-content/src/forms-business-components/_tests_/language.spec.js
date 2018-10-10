import LanguageStore, {
  Languages
} from 'govil-common-content/forms-business-components/src/language';
import LanguageDefinition from 'govil-common-content/forms-business-components/src/languageDefinition';
import { computed } from 'mobx';

describe('Language Store', () => {
  test('return new instance of language', () => {
    expect(LanguageStore).toBeInstanceOf(Languages);
  });
  describe('availableLanguagesList', () => {
    test('by default - hebrew only', () => {
      expect(LanguageStore.availableLanguagesList.length).toBe(1);
      expect(LanguageStore.availableLanguagesList[0].longName).toBe('hebrew');
      expect(LanguageStore.languageName).toBe('hebrew');
    });
    test('override default by call setAvaliableLanguges', () => {
      LanguageStore.setAvaliableLanguages(['english']);
      expect(LanguageStore.availableLanguagesList[0].longName).toBe('english');
    });
    test('setAvaliableLanguages fail when request unknown language', () => {
      expect(() => {
        LanguageStore.setAvaliableLanguages(['bla']);
      }).toThrowError(`missing definitions to the requested language: bla`);
    });
    // test('include instances of LanguageDefinition', () => {
    //   console.log(LanguageDefinition);
    //   expect(LanguageStore.availableLanguagesList[0]).toBeInstanceOf(
    //     LanguageDefinition
    //   );
    // });
  });
  describe('computedResourcesProvider', () => {
    test('get require object parameter', () => {
      expect(() => {
        LanguageStore.computedResourcesProvider('da');
      }).toThrow();
      expect(() => {
        LanguageStore.computedResourcesProvider();
      }).toThrow();
      expect(() => {
        LanguageStore.computedResourcesProvider({
          english: 'get',
          hebrew: 'בחר'
        });
      }).not.toThrow();
    });
    describe('retun computed', () => {
      test('that update by current language', () => {
        const text = LanguageStore.computedResourcesProvider({
          english: 'get',
          hebrew: 'בחר'
        });
        expect(text.get()).toBe('בחר');
        LanguageStore.set_language('english');
        expect(text.get()).toBe('get');
      });
      test('that throw error when parameter object not include text in current language', () => {
        const text = LanguageStore.computedResourcesProvider({
          english: 'get',
          hebrew: 'בחר'
        });
        LanguageStore.set_language('arabic');
        expect(() => {
          text.get();
        }).toThrow();
      });
    });
  });
  describe('getLanguageDefinition', () => {
    test('should get string of language longName', () => {
      expect(() => {
        LanguageStore.getLanguageDefinition();
      }).toThrow();
      expect(() => {
        LanguageStore.getLanguageDefinition({});
      }).toThrow();
      expect(() => {
        LanguageStore.getLanguageDefinition('english');
      }).not.toThrow();
    });
    test('should return the languageDefinition object of requested language', () => {
      const languageDefinition = LanguageStore.getLanguageDefinition('english');
      expect(languageDefinition.longName).toBeDefined();
      expect(languageDefinition.dir).toBeDefined();
      expect(languageDefinition.shortName).toBeDefined();
      expect(languageDefinition.text).toBeDefined();
      expect(languageDefinition.defaultLanguage).toBeDefined();
    });
  });
  describe('languageDefinition', () => {
    test('computed that include languageDefinition of current language', () => {
      LanguageStore.set_language('hebrew');
      expect(LanguageStore.languageDefinition.longName).toBe('hebrew');
      expect(LanguageStore.languageDefinition.dir).toBe('rtl');
    });
  });
  describe('isMultiLanguages', () => {
    test('computed that return true if defined more thae 1 language', () => {
      LanguageStore.setAvaliableLanguages(['hebrew']);
      expect(LanguageStore.isMultiLanguages).toBe(false);
      LanguageStore.setAvaliableLanguages(['hebrew', 'english']);
      expect(LanguageStore.isMultiLanguages).toBe(true);
    });
  });
  describe('isRtl', () => {
    test('computed that return true if current language direction is rtl', () => {
      LanguageStore.setAvaliableLanguages(['hebrew', 'english']);
      LanguageStore.set_language('hebrew');
      expect(LanguageStore.isRtl).toBe(true);
      LanguageStore.set_language('english');
      expect(LanguageStore.isRtl).toBe(false);
    });
  });
  describe('direction', () => {
    test('computed that return current language direction ', () => {
      LanguageStore.set_language('hebrew');
      expect(LanguageStore.direction).toBe('rtl');
      LanguageStore.set_language('english');
      expect(LanguageStore.direction).toBe('ltr');
    });
  });
  describe('getShortName', () => {
    test('computed that return current language shortName', () => {
      LanguageStore.set_language('hebrew');
      expect(LanguageStore.getShortName).toBe('he');
      LanguageStore.set_language('english');
      expect(LanguageStore.getShortName).toBe('en');
    });
  });
  describe('getDefaultLanguage - function that return defaultLanguage of requested language', () => {
    test('required parameter - language longName', () => {
      expect(() => {
        LanguageStore.getDefaultLanguage();
      }).toThrow();
      expect(() => {
        LanguageStore.getDefaultLanguage({});
      }).toThrow();
      expect(() => {
        LanguageStore.getDefaultLanguage('english');
      }).not.toThrow();
      expect(LanguageStore.getDefaultLanguage('english')).toBe('english');
    });
  });
});
