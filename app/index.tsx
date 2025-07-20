import InputBar from "@/components/InputBar";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ThemeContext } from "@/context/ThemeContext";
import { Todo, useTodos } from "@/hooks/useTodos";
import { darkTheme, lightTheme } from "@/styles/theme";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { LinearTransition } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [text, setText] = useState('')
  const { colorScheme, setColorScheme } = useContext(ThemeContext)
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme
  const router = useRouter()
  const [loaded, error] = useFonts({ Inter_500Medium })
  const styles = createStyles(theme, colorScheme)
  const { todos, addTodo, toggleTodo, removeTodo, loading } = useTodos()

  if ((!loaded && !error) || loading) {
    return <SafeAreaView style={styles.container}><ActivityIndicator size="large" color={theme.text} /></SafeAreaView>
  }

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo(text)
      setText('')
    }
  }

  const handlePress = (id: number) => {
    router.push(`/todos/${id}`)
  }

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Pressable
        onPress={() => handlePress(item.id)}
        onLongPress={() => toggleTodo(item.id)}
      >
        <Text
          style={[styles.todoText, item.completed && styles.completedText]}
        >
          {item.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color='red' selectable={undefined} />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <InputBar
        value={text}
        onChangeText={setText}
        onPressButton={handleAdd}
        buttonText="Add"
        placeholder="Add a new todo"
        theme={theme}
        colorScheme={colorScheme}
        style={{ marginBottom: 10 }}
      >
        <ThemeToggleButton
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          theme={theme}
          style={{ marginLeft: 10 }}
        />
      </InputBar>

      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

function createStyles(theme: typeof lightTheme, colorScheme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto'
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray'
    }
  })
} 