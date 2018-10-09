import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';

@assertParametersType({
  settings: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
    // component: PropTypes.func
  })
})
class RouteSettings {
  constructor(settings) {
    const { name, path, component } = settings;
    this.name = name;
    this.path = path;
    this.component = component;
  }
}
export default RouteSettings;
