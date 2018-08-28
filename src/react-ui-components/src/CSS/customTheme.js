import { createMuiTheme } from '@material-ui/core/styles';

const basicColor = '#275c7e';
const lightBasicColor = '#e9f4fa';
const basicFontSize = '15px';
const basicFontFamily = 'arimo, Arial';
const boldBasicFontFamily = 'arimo-bold, Arial';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: basicColor
    }
  },
  direction: 'rtl',
  typography: {
    fontSize: basicFontSize,
    fontFamily: basicFontFamily,
    title: {},
    subTitle: {
      color: basicColor,
      fontSize: boldBasicFontFamily,
      width: '100%',
      backgroundColor: lightBasicColor,
      borderRight: '4px solid ' + basicColor,
      marginTop: '20px',
      padding: '10px 15px'
    },
    blueTitle: {
      color: basicColor,
      fontSize: basicFontSize,
      fontFamily: basicFontFamily,
      textAlign: 'center'
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
