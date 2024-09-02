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
    lightYellow: '#FFAE34',
    lightBlue: '#60A2FF',
    errorText: '#DF3E51',
    lightGray: '#606567',
    lightGreen: '#18c993',
    inActiveTab: 'rgba(255, 255, 255, 0)',
    transparent: 'rgba(255, 255, 255, 0.08)',
    selectedTabColor: 'rgba(22, 202, 198, 0.10)',
    bgColor: '#030303',
    disabledTextColor: 'rgba(255, 255, 255, 0.60)',
    backgroundCardColor: '#161B22',
    placeholderTextColor: 'rgba(255, 255, 255, 0.30)',
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
    EnglishHolly: '#253E31',
    LaurelGarland: '#686d5d',
    AmericanSilver: '#CECECE',
    BlueChaos: '#5892FF',
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
    lightYellow: '#FFAE34',
    lightBlue: '#60A2FF',
    errorText: '#DF3E51',
    lightGray: '#606567',
    lightGreen: '#18c993',
    inActiveTab: 'rgba(255, 255, 255, 0)',
    transparent: 'rgba(255, 255, 255, 0.08)',
    selectedTabColor: 'rgba(22, 202, 198, 0.10)',
    bgColor: '#111',
    disabledTextColor: 'rgba(255, 255, 255, 0.60)',
    backgroundCardColor: '#161B22',
    placeholderTextColor: 'rgba(255, 255, 255, 0.30)',
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
    EnglishHolly: '#253E31',
    LaurelGarland: '#686d5d',
    AmericanSilver: '#CECECE',
    BlueChaos: '#5892FF',
  },
};

export type AppTheme = typeof DefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
