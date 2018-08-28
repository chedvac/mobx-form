import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

@assertParametersType({
  settings: PropTypes.shape({
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.func
  })
})
class RouteSettings {
  constructor(settings) {
    const { number, name, path, component } = settings;
    this.number = number;
    this.name = name;
    this.path = path;
    this.component = component;
  }
}
export default RouteSettings;
