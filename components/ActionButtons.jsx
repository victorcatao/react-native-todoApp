import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ActionButtons({ buttons = [], style, theme, colorScheme }) {
  const styles = createStyles(theme, colorScheme);
  return (
    <View style={[styles.container, style]}>
      {buttons.map((btn, idx) => (
        <Pressable
          key={btn.text + idx}
          onPress={btn.onPress}
          style={[styles.button, btn.backgroundColor && { backgroundColor: btn.backgroundColor }]}
        >
          <Text style={[styles.buttonText, btn.textColor && { color: btn.textColor }]}>{btn.text}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 6,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    button: {
      backgroundColor: theme?.button || '#007bff',
      borderRadius: 5,
      padding: 10,
      marginRight: 6,
    },
    buttonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
  });
} 