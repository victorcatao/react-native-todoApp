import { Octicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function ThemeToggleButton({ colorScheme, setColorScheme, theme, style }) {
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