import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { darkTheme, lightTheme } from '@/constants/colors';
import { useAppSettingsContext } from './appSettingsContext';

interface ThemeContextProps {
  theme: typeof darkTheme;
  changeTheme: (mode: 'light' | 'dark') => Promise<void>;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

  const { settings, updateSettings } = useAppSettingsContext();

  const [theme, setTheme] = useState(darkTheme);

  const changeTheme = async (mode: 'light' | 'dark') => {
    updateSettings({ theme: mode })
  };

  useEffect(() => {
    if (settings?.theme) {
      setTheme(settings.theme === 'light' ? lightTheme : darkTheme);
    }
  }, [settings?.theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
