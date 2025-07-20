import { Octicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';

interface ThemeToggleButtonProps {
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  theme: any;
  style?: ViewStyle;
}

export default function ThemeToggleButton({ colorScheme, setColorScheme, theme, style }: ThemeToggleButtonProps) {
  return (
    <Pressable
      onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
      style={style}
    >
      <Octicons
        name={colorScheme === 'dark' ? 'moon' : 'sun'}
        size={36}
        color={theme.text}
        selectable={undefined}
        style={{ width: 36 }}
      />
    </Pressable>
  );
} 