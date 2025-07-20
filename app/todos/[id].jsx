import ActionButtons from "@/components/ActionButtons";
import InputBar from "@/components/InputBar";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ThemeContext } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditScreen() {
    const { id } = useLocalSearchParams()
    const [todo, setTodo] = useState({})
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const router = useRouter()

    const [loaded, error] = useFonts({
        Inter_500Medium
    })

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setTodo(myTodo)
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchData(id)
    }, [])

    const styles = createStyles(theme, colorScheme)

    if (!loaded && !error) {
        return null
    }

    const handleSave = async () => {
        try {
            const savedTodo = { ...todo, title: todo.title }
            const jsonValue = await AsyncStorage.getItem('TodoApp')
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null
            if (storageTodos && storageTodos.length) {
                const otherTodos = storageTodos.filter(t => t.id !== savedTodo.id)
                const allTodos = [...otherTodos, savedTodo]
                await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos))
            } else {
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <InputBar
                value={todo?.title || ''}
                onChangeText={text => setTodo(prev => ({ ...prev, title: text }))}
                onPressButton={handleSave}
                buttonText="Save"
                placeholder="Edit todo"
                theme={theme}
                colorScheme={colorScheme}
            >
                <ThemeToggleButton
                    colorScheme={colorScheme}
                    setColorScheme={setColorScheme}
                    theme={theme}
                    style={{ marginLeft: 10 }}
                />
            </InputBar>
            <ActionButtons
                buttons={[
                    {
                        text: 'Save',
                        onPress: handleSave,
                        backgroundColor: theme.button,
                        textColor: colorScheme === 'dark' ? 'black' : 'white',
                    },
                    {
                        text: 'Cancel',
                        onPress: () => router.push('/'),
                        backgroundColor: 'red',
                        textColor: 'white',
                    },
                ]}
                theme={theme}
                colorScheme={colorScheme}
            />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background
        }
    })
}