import { createContext, ReactNode, useState } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '../constants/Colors';

export interface ThemeContextType {
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  theme: any;
}

export const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  setColorScheme: () => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<string>(Appearance.getColorScheme() || 'light');
  const setColorScheme = (scheme: string) => setColorSchemeState(scheme);
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 