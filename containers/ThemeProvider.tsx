import React, { memo, useMemo } from 'react';
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as AppDarkTheme,
  DefaultTheme as AppDefaultTheme,
} from '@constants/theme';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { RootState, useSelector } from '@redux/store';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(AppDefaultTheme, LightTheme);
const CombinedDarkTheme = merge(AppDarkTheme, DarkTheme);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => {
    const { currentTheme } = useSelector((state: RootState) => state.theme);

    const currentThemes = useMemo(() => {
      const theme =
        currentTheme === 'default' ? CombinedDefaultTheme : CombinedDarkTheme;
      return theme;
    }, [currentTheme]);

    return (
      <StyledThemeProvider theme={currentThemes}>
        <PaperProvider theme={currentThemes} children={children} />
      </StyledThemeProvider>
    );
  },
);

export default ThemeProvider;
