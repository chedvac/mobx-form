import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

@assertParametersType({
  settings: PropTypes.shape({
    longName: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    defaultLanguage: PropTypes.string.isRequired,
    dir: PropTypes.string.isRequired
  })
})
class LanguageDefinition {
  constructor(settings) {
    const { longName, shortName, text, defaultLanguage, dir } = settings;
    this.longName = longName;
    this.shortName = shortName;
    this.text = text;
    this.defaultLanguage = defaultLanguage;
    this.dir = dir;
  }
}
export default LanguageDefinition;
