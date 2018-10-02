import { action, computed, autorun, observable } from 'mobx';
import ModularViewModel from 'mobx-vm/modularViewModel';
import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fail from 'utils/fail';
const languagesDefinitions = [
  {
    longName: 'english',
    shortName: 'en',
    text: 'English',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'hebrew',
    shortName: 'he',
    text: 'עברית',
    defaultLanguage: 'hebrew',
    dir: 'rtl'
  },
  {
    longName: 'arabic',
    shortName: 'ar',
    text: 'العربي',
    defaultLanguage: 'hebrew',
    dir: 'rtl'
  },
  {
    longName: 'russian',
    shortName: 'ru',
    text: 'Русский',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'amharic',
    shortName: 'am',
    text: 'አማርኛ',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'french',
    shortName: 'fr',
    text: 'Français',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'spanish',
    shortName: 'es',
    text: 'Español',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'german',
    shortName: 'de',
    text: 'Deutsche',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'korean',
    shortName: 'ko',
    text: '한국어',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'chinese',
    shortName: 'zh',
    text: '中文',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'nepali',
    shortName: 'ne',
    text: 'नेपाली',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'romanian',
    shortName: 'ro',
    text: 'Română',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'hindi',
    shortName: 'hi',
    text: 'हिंदी',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'thai',
    shortName: 'th',
    text: 'ไทย',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'bulgarian',
    shortName: 'bg',
    text: 'български',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'ukrainian',
    shortName: 'uk',
    text: 'український',
    defaultLanguage: 'english',
    dir: 'ltr'
  },
  {
    longName: 'tagalog',
    shortName: 'tl',
    text: 'tagalog',
    defaultLanguage: 'english',
    dir: 'ltr'
  }
];
class Languages extends ModularViewModel {
  constructor(availableLanguages = ['hebrew', 'english', 'arabic']) {
    super();
    this.setAvaliableLanguges(availableLanguages);
  }
  getLanguageDefinition(languageName) {
    return languagesDefinitions.find(item => item.longName === languageName);
  }

  @observable
  languageName = 'hebrew';

  @action
  setAvaliableLanguges(availableLanguages) {
    this.availableLanguagesList = [];
    availableLanguages.forEach(languageName => {
      const langugeObject = this.getLanguageDefinition(languageName);
      langugeObject
        ? this.availableLanguagesList.push(langugeObject)
        : fail(`missing definitions to requested language: ${languageName}`);
    });
  }
  @computed
  get isHebrew() {
    this.languageName === 'hebrew';
  }
  @action.bound
  set_language(languageName) {
    this.languageName = languageName; //this.getLanguageDefinition(languageName);
  }
  @computed
  get languageDefinition() {
    return this.getLanguageDefinition(this.languageName);
  }
  @observable
  availableLanguagesList = [];

  @assertParametersType({ texts: PropTypes.object })
  getText(texts = {}) {
    return texts[this.language]
      ? texts[this.language.longName]
      : fail(
          `missing text in current language. the reuested object is ${texts}`
        );
  }
}
export default new Languages();
