import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import ShopeeTheme from './themes/ShopeeTheme';
import TokopediaTheme from './themes/TokopediaTheme';
import LazadaTheme from './themes/LazadaTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { settings } = useSettings();

  const renderTheme = () => {
    switch (settings.theme) {
      case 'tokopedia':
        return <TokopediaTheme>{children}</TokopediaTheme>;
      case 'lazada':
        return <LazadaTheme>{children}</LazadaTheme>;
      case 'shopee':
      default:
        return <ShopeeTheme>{children}</ShopeeTheme>;
    }
  };

  return renderTheme();
};

export default ThemeProvider;