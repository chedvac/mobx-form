import { createMuiTheme } from '@material-ui/core/styles';

const basicColor = '#275c7e';
const lightBasicColor = '#e9f4fa';
const basicFontSize = '15px';
const basicFontFamily = 'arimo-bold, Arial';

const customTheme = createMuiTheme({
  typography: {
    fontSize: basicFontSize,
    fontFamily: basicFontFamily,
    title: {},
    subTitle: {
      color: basicColor,
      fontSize: basicFontSize,
      width: '100%',
      backgroundColor: lightBasicColor,
      borderRight: '4px solid ' + basicColor,
      padding: '10px 15px'
    }
  },
  palette: {
    primary: {
      main: basicColor
    }
  }
  // ,overrides: {
  //   MuiStepIcon: {
  //     root: {
  //       color: 'red'
  //     }
  //   }
  // }
});

export default customTheme;
