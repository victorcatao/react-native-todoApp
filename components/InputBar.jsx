import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputBar({
  value,
  onChangeText,
  onPressButton,
  buttonText = 'Add',
  placeholder = '',
  theme,
  colorScheme,
  children,
  style
}) {
  const styles = createStyles(theme, colorScheme);
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.input}
        maxLength={30}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable onPress={onPressButton} style={styles.addButton}>
        <Text style={styles.addButtonText}>{buttonText}</Text>
      </Pressable>
      {children}
    </View>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
      gap: 6,
    },
    input: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme?.text || 'black',
    },
    addButton: {
      backgroundColor: theme?.button || '#007bff',
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
  });
} 