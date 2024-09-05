import {
  DefaultTheme as RNPDefaultTheme,
  MD3DarkTheme as RNPDarkTheme,
  useTheme,
} from 'react-native-paper';

export const DefaultTheme = {
  myOwnProperty: true,
  ...RNPDefaultTheme,
  roundness: 2,
  colors: {
    ...RNPDefaultTheme.colors,
    white: '#FFFFFF',
    black: '#000000',
    gray: '#CCCCCC',
    error: '#F04438',
    skyBlue: '#B5E7FF',
    lightSkyBlue: '#B5E7FF40',
    info: '#0DC3FF',
    warning: '#FFEA00',
    success: '#00FFC2',
    tabBar: '#212933',
    darkBackground: '#161B22',
    grayText: '#FFFFFF99',
    primaryColor: '#41C47E',
    errorText: '#DF3E51',
    inActiveTab: 'rgba(255, 255, 255, 0)',
    transparent: 'rgba(255, 255, 255, 0.08)',
    selectedTabColor: 'rgba(22, 202, 198, 0.10)',
    bgColor: '#030303',
    disabledTextColor: 'rgba(255, 255, 255, 0.60)',
    backgroundCardColor: '#161B22',
    placeholderTextColor: '#0000006B',
    positionBg: '#212833',
    deleteColor: '#DF3E51',
    modalHeading: '#E6E0E9',
    modalDescription: '#CAC4D0',
    modalContainer: '#212933',
    notificationError: '#E2463C',
    notificationScrBg: '#02070F',
    notificationShadow: 'rgba(21, 98, 62, 0.18)',
    lightGrayColor: '#DADDE2',
    bottomsheetColor: '#161B22',
    primarygradient2: '#1DC771',
    lightBorder: '#333',
    screenTemplateColor: '#F8F8F9',
    textDark: '#253E31',
    textGray: '#818181',
    lightGray: '#E1E1E1',
    lightBlue: '#E6Efff',
    blue: '#3263C0',
    green: '#2C9058',
    lightGreen: '#C7D7Ce',
    yellow: '#765A00',
    lightYellow: '#FFF3D8',
    red: '#E05050',
    lightRed: '#EA6868',
    greenLight: '#C9F7D5',
    yellowLight: '#FFE7B3',
    redLight: '#FFDBD2',
    blueLight: '#CDDFFF',
    grayLight: '#D9D9D9',
    boogieBlast12: '#13944B1F',
    EnglishHolly: '#253E31',
    LaurelGarland: '#686d5d',
    AmericanSilver: '#CECECE',
    BlueChaos: '#5892FF',
    IcewindDale: '#E8Ecee',
    ChristmasSilver: '#e0e0e0',
    background: '#00000080',
    twilightZone: '#1a1a17',
    aria: '#E3E3E3',
    lightBlack: '#0000004D',
    snowflake: '#F0F0F0',
    roseMadder: '#e33a3a',
    englishHolly: '#253E31',
    laurelGarland: '#686d5d',
    americanSilver: '#CECECE',
    blueChaos: '#5892FF',
  },
};

export const DarkTheme: AppTheme = {
  myOwnProperty: true,
  ...RNPDarkTheme,
  roundness: 2,
  colors: {
    ...RNPDarkTheme.colors,
    white: '#FFFFFF',
    black: '#000000',
    gray: '#CCCCCC',
    error: '#F04438',
    skyBlue: '#B5E7FF',
    lightSkyBlue: '#B5E7FF40',
    info: '#0DC3FF',
    warning: '#FFEA00',
    success: '#00FFC2',
    tabBar: '#212933',
    darkBackground: '#161B22',
    grayText: '#FFFFFF99',
    primaryColor: '#41C47E',
    errorText: '#DF3E51',
    inActiveTab: 'rgba(255, 255, 255, 0)',
    transparent: 'rgba(255, 255, 255, 0.08)',
    selectedTabColor: 'rgba(22, 202, 198, 0.10)',
    bgColor: '#111',
    disabledTextColor: 'rgba(255, 255, 255, 0.60)',
    backgroundCardColor: '#161B22',
    placeholderTextColor: '#0000006B',
    positionBg: '#212833',
    deleteColor: '#DF3E51',
    modalHeading: '#E6E0E9',
    modalDescription: '#CAC4D0',
    modalContainer: '#212933',
    notificationError: '#E2463C',
    notificationScrBg: '#02070F',
    notificationShadow: 'rgba(21, 98, 62, 0.18)',
    lightGrayColor: '#DADDE2',
    bottomsheetColor: '#161B22',
    primarygradient2: '#1DC771',
    lightBorder: '#333',
    screenTemplateColor: '#F8F8F9',
    textDark: '#253E31',
    textGray: '#818181',
    lightGray: '#E1E1E1',
    lightBlue: '#E6Efff',
    blue: '#3263C0',
    green: '#2C9058',
    lightGreen: '#C7D7Ce',
    yellow: '#765A00',
    lightYellow: '#FFF3D8',
    red: '#E05050',
    lightRed: '#EA6868',
    greenLight: '#C9F7D5',
    yellowLight: '#FFE7B3',
    redLight: '#FFDBD2',
    blueLight: '#CDDFFF',
    grayLight: '#D9D9D9',
    boogieBlast12: '#13944B1F',
    EnglishHolly: '#253E31',
    LaurelGarland: '#686d5d',
    AmericanSilver: '#CECECE',
    BlueChaos: '#5892FF',
    IcewindDale: '#E8Ecee',
    ChristmasSilver: '#e0e0e0',
    background: '#00000080',
    twilightZone: '#1a1a17',
    aria: '#E3E3E3',
    snowflake: '#F0F0F0',
    lightBlack: '#0000004D',
    roseMadder: '#e33a3a',
    englishHolly: '#253E31',
    laurelGarland: '#686d5d',
    americanSilver: '#CECECE',
    blueChaos: '#5892FF',
  },
};

export type AppTheme = typeof DefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
