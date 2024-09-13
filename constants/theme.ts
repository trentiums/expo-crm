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
    icewindDale: '#E8Ecee',
    christmasSilver: '#e0e0e0',
    background: '#00000080',
    twilightZone: '#1a1a17',
    aria: '#E3E3E3',
    lightBlack: '#0000004D',
    snowflake: '#F0F0F0',
    englishHolly: '#253E31',
    laurelGarland: '#686d5d',
    americanSilver: '#CECECE',
    blueChaos: '#5892FF',
    black15: '#00000026',
    boysenberryShadow: '#f3f4f8',
    doctor: '#f9f9f8',
    distantCloud: '#e5e9e6',
    tarnishedSilver16: '#78788029',
    roseMadder: '#e33a3a',
  },
};

export const DarkTheme: AppTheme = {
  myOwnProperty: true,
  ...RNPDarkTheme,
  roundness: 2,
  colors: {
    ...RNPDefaultTheme.colors,
    white: '#000000',
    black: '#FFFFFF',
    gray: '#333333',
    error: '#F04438',
    skyBlue: '#1E3A5F',
    lightSkyBlue: '#1E3A5F40',
    info: '#0DC3FF',
    warning: '#FFCC00',
    success: '#00FFC2',
    tabBar: '#161B22',
    darkBackground: '#0D1117',
    grayText: '#CCCCCC99',
    primaryColor: '#1B6F42',
    errorText: '#FF5A5F',
    inActiveTab: 'rgba(0, 0, 0, 0)',
    transparent: 'rgba(255, 255, 255, 0.08)',
    selectedTabColor: 'rgba(22, 202, 198, 0.10)',
    bgColor: '#0D0D0D',
    disabledTextColor: 'rgba(255, 255, 255, 0.40)',
    backgroundCardColor: '#1C1F26',
    placeholderTextColor: '#FFFFFF4D',
    positionBg: '#1B2026',
    deleteColor: '#DF3E51',
    modalHeading: '#FFFFFF',
    modalDescription: '#B0B0B0',
    modalContainer: '#161B22',
    notificationError: '#FF5A5F',
    notificationScrBg: '#101317',
    notificationShadow: 'rgba(21, 98, 62, 0.18)',
    lightGrayColor: '#7A7A7A',
    bottomsheetColor: '#1A1E24',
    primarygradient2: '#145A32',
    lightBorder: '#444',
    screenTemplateColor: '#0F0F0F',
    textDark: '#CFCFCF',
    textGray: '#B3B3B3',
    lightGray: '#4A4A4A',
    lightBlue: '#4A6B82',
    blue: '#1A4D7D',
    green: '#1C5F3D',
    lightGreen: '#6B857A',
    yellow: '#7A5B00',
    lightYellow: '#FFECBD',
    red: '#E05050',
    lightRed: '#B94A4A',
    greenLight: '#5B8D63',
    yellowLight: '#A07D42',
    redLight: '#B44A49',
    blueLight: '#4F6780',
    grayLight: '#555555',
    boogieBlast12: '#0A3A1F1F',
    icewindDale: '#2B2F31',
    christmasSilver: '#3A3A3A',
    background: '#0F0F0F80',
    twilightZone: '#121212',
    aria: '#3A3A3A',
    lightBlack: '#0000004D',
    snowflake: '#3A3A3A',
    englishHolly: '#1A3E31',
    laurelGarland: '#404840',
    americanSilver: '#878787',
    blueChaos: '#2B4A72',
    black15: '#00000026',
    boysenberryShadow: '#2A2A2A',
    doctor: '#1C1C1C',
    distantCloud: '#3B3B3B',
    tarnishedSilver16: '#5A5A5A29',
    roseMadder: '#C73636',
  },
};

export type AppTheme = typeof DefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
