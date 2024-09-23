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
    lightRed: '#EA686826',
    greenLight: '#C9F7D5',
    yellowLight: '#FFE7B3',
    redLight: '#FFDBD2',
    blueLight: '#CDDFFF',
    grayLight: '#D9D9D9',
    boogieBlast12: '#13944B1F',
    iceWindDale: '#E8Ecee',
    christmasSilver: '#e0e0e0',
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
    zhuBaiPearl: '#F8f8f8',
    namaraGrey: ' #7c7c7d',
    modernLavender: '#A8AcB3',
    plaster: '#EAEAEA',
    flyByNight: '#181D4B',
    carolinaBlue: '#adcaff',
    black15: '#00000026',
    boysenberryShadow: '#f3f4f8',
    moreThan: '#8d8d8d',
    lightHouse: '#f4f4f4',
    carbonFootprint: '#7A7E89',
    doctor: '#f9f9f8',
    distantCloud: '#e5e9e6',
    tarnishedSilver16: '#78788029',
    funGreen: '#0f6936',
    funWhite: '#fff',
    pickford: '#C9F7D5',
    sunKissed: '#ffe9ba',
    softOrange: '#FFDBD2',
    arcLight: '#CDDFFF',
    orochimaru: '#D9D9D9',
    dugong: '#fff',
    grayHolly: '#253E31',
    snowflakeBlack: '#F0F0F0',
    snowflakeWhite: '#fff',
    snowGray: '#8D8D8D',
    datePickerBg: '#161B22',
  },
};

export const DarkTheme: AppTheme = {
  myOwnProperty: true,
  ...RNPDarkTheme,
  roundness: 2,
  colors: {
    ...RNPDefaultTheme.colors,
    white: '#1E1E1E',
    black: '#FFFFFF',
    gray: '#888888',
    error: '#F04438',
    skyBlue: '#4A90E2',
    lightSkyBlue: '#4A90E280',
    info: '#0DC3FF',
    warning: '#FFC107',
    success: '#00FFC2',
    tabBar: '#212933',
    darkBackground: '#0A0A0A',
    grayText: '#CCCCCC',
    primaryColor: '#41C47E',
    errorText: '#F28B82',
    inActiveTab: 'rgba(255, 255, 255, 0.2)',
    transparent: 'rgba(255, 255, 255, 0.12)',
    selectedTabColor: 'rgba(22, 202, 198, 0.20)',
    bgColor: '#121212',
    disabledTextColor: 'rgba(255, 255, 255, 0.50)',
    backgroundCardColor: '#161B22',
    placeholderTextColor: '#888888',
    positionBg: '#1E1E1E',
    deleteColor: '#F28B82',
    modalHeading: '#FFFFFF',
    modalDescription: '#BBBBBB',
    modalContainer: '#1E1E1E',
    notificationError: '#E2463C',
    notificationScrBg: '#02070F',
    notificationShadow: 'rgba(0, 0, 0, 0.5)',
    lightGrayColor: '#4D4D4D',
    bottomsheetColor: '#1E1E1E',
    primarygradient2: '#1DC771',
    lightBorder: '#2E2E2E',
    screenTemplateColor: '#222222',
    textDark: '#FFFFFF',
    textGray: '#BBBBBB',
    lightGray: '#b4b4b4',
    lightBlue: '#90CAF9',
    blue: '#2962FF',
    green: '#4fc984',
    lightGreen: '#9BB0A5',
    yellow: '#9d7800',
    lightYellow: '#FFF3D8',
    red: '#E53935',
    lightRed: '#FFCDD2',
    greenLight: '#9ff1b5',
    yellowLight: '#ffe9ba',
    redLight: '#ffb9a7',
    blueLight: '#accaff',
    grayLight: '#b4b4b4',
    boogieBlast12: '#13944B1F',
    iceWindDale: '#424242',
    christmasSilver: '#505050',
    background: '#121212',
    twilightZone: '#ddddd9',
    aria: '#CCCCCC',
    lightBlack: '#1E1E1E',
    snowflake: '#444444',
    roseMadder: '#D32F2F',
    englishHolly: '#dcdcdc',
    laurelGarland: '#8D8D8D',
    americanSilver: '#A5A5A5',
    blueChaos: '#89b2ff',
    zhuBaiPearl: '#5b5959',
    namaraGrey: '#9E9E9E',
    modernLavender: '#A8AcB3',
    plaster: '#898989',
    flyByNight: '#0D1A3B',
    carolinaBlue: '#A3BFFA',
    black15: '#1A1A1A',
    boysenberryShadow: '#444444',
    moreThan: '#CCCCCC',
    lightHouse: '#3A3A3A',
    carbonFootprint: '#e4e5e7',
    doctor: '#212121',
    distantCloud: '#616161',
    tarnishedSilver16: '#33333380',
    funGreen: '#66BB6A',
    funWhite: '#fff',
    pickford: '#daf9e3',
    sunKissed: '#fffcf5',
    softOrange: '#ffefeb',
    arcLight: '#f5f9ff',
    orochimaru: '#f0f0f0',
    dugong: '#7c7c7c',
    grayHolly: '#426e56',
    snowflakeBlack: '#ababab',
    snowflakeWhite: '#444444',
    snowGray: '#fff',
    datePickerBg: '#5d718e',
  },
};

export type AppTheme = typeof DefaultTheme;

export const useAppTheme = () => useTheme<AppTheme>();
