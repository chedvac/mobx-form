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
    },
    background: {
      default: 'white'
    }
  },
  typography: {
    fontSize: basicFontSize,
    fontFamily: basicFontFamily,
    rtlDirection: { direction: 'rtl' },
    ltrDirection: { direction: 'ltr' },
    title: {},
    hide: { display: 'none' },
    boldText: { fontFamily: boldBasicFontFamily },
    subTitle: {
      color: basicColor,
      fontFamily: boldBasicFontFamily,
      width: '100%',
      backgroundColor: lightBasicColor,
      borderRight: `4px solid ${basicColor}`,
      padding: '10px 15px'
    },
    blueTitle: {
      color: basicColor,
      fontSize: basicFontSize,
      fontFamily: basicFontFamily,
      textAlign: 'center'
    }
  }
});

export default customTheme;
