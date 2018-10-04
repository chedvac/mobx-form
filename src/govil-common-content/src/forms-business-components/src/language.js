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
  }
];
class Languages extends ModularViewModel {
  constructor(availableLanguages = ['hebrew']) {
    super();
    this.setAvaliableLanguges(availableLanguages);
  }

  @observable
  languageName = 'hebrew';

  @observable
  availableLanguagesList = [];

  @action.bound
  set_language(languageName) {
    //TODO rename to setLanguage
    this.languageName = languageName;
  }
  _isLanguageDefined(languageName) {
    return this.availableLanguagesList
      .map(lang => lang.longName)
      .includes(languageName);
  }
  /* @function <b>setAvaliableLanguges</b>
  * @description  set definition object of the requested languages in availableLanguagesList array 
  * @param {array} availableLanguages - array of  languages longName
  * @example  setAvaliableLanguges(['english', 'hebrew'])
  */
  @action
  setAvaliableLanguges(availableLanguages) {
    //TODO rename to setAvaliableLanguages
    availableLanguages.forEach(languageName => {
      if (this._isLanguageDefined(languageName)) {
        return;
      }
      const langugeObject = this.getLanguageDefinition(languageName);
      langugeObject
        ? this.availableLanguagesList.push(langugeObject)
        : fail(
            `missing definitions to the requested language: ${languageName}`
          );
    });
  }
  /* @function <b>getText</b>
  * @description return computed of text in current language, if th eobject not include key for the current language throw error
  * @param {object} texts - object with available languages as keys and texts for each one as value 
  * @returns {computed} 
  */
  @assertParametersType({ texts: PropTypes.object })
  getText(texts = {}) {
    return computed(() => {
      return (
        texts[this.languageName] ||
        fail(
          `missing text in current language. the reuested object is ${texts}`
        )
      );
    });
  }
  /* @function <b>getLanguageDefinition</b>
  * @description return language object from languagesDefinitions by sent language
  * @param {string} languageLongName - long name of language
  * @returns {object} language object from languagesDefinitions or null
  */
  getLanguageDefinition(languageLongName) {
    return languagesDefinitions.find(
      item => item.longName === languageLongName
    );
  }
  /* @computed <b>languageDefinition</b>
  * @description return  current language definition object
  * @returns {object} 
  * @example 
    var isRtl = languageViewModel.languageDefinition.get()// return {longName: 'english',shortName: 'en',text: 'English',defaultLanguage: 'english',dir: 'ltr'}
  */
  @computed
  get languageDefinition() {
    return this.getLanguageDefinition(this.languageName);
  }
  /* @computed <b>isMultiLanguages</b>
  * @description return  is defined more then one language
  * @returns {bool} 
  */
  @computed
  get isMultiLanguages() {
    this.availableLanguagesList.length > 1;
  }
  /* @computed <b>isRtl</b>
  * @description return true when current language dir is rtl
  * @returns {bool} true/false
  * @example 
    var isRtl = languageViewModel.isRtl()// return true
  */
  @computed
  get isRtl() {
    return this.languageDefinition.get().dir === 'rtl';
  }
  /* @computed <b>direction</b>
  * @description return current language direction
  * @returns {string} "ltr"/"rtl"
  * @example 
  get direction() {
    var גןרקבאןםמ = languageViewModel.direction()// "rtl"
  */
  @computed
  get direction() {
    return this.languageDefinition.get().dir;
  }
  /* @function <b>getShortName</b>
  * @description return the current language short name
  * @returns {string} short name
  * @example 
  var shortName = languageViewModel.getShortName()// return 'he'
  */
  getShortName() {
    return this.languageDefinition.get().shortName;
  }
  /* @function <b>getDefaultLanguage</b>
    * @description return the default language for sent language
    * @param {string} languageName - long name of language
    * @returns {string} default language
    */
  getDefaultLanguage(languageName) {
    return this.getLanguageDefinition(languageName).defaultLanguage;
  }
}

export default new Languages();
