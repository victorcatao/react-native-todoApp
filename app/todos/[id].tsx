import ActionButtons from "@/components/ActionButtons";
import InputBar from "@/components/InputBar";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ThemeContext } from "@/context/ThemeContext";
import { Todo, useTodos } from "@/hooks/useTodos";
import { darkTheme, lightTheme } from "@/styles/theme";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditScreen() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { colorScheme, setColorScheme } = useContext(ThemeContext)
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme
    const router = useRouter()
    const [loaded, error] = useFonts({ Inter_500Medium })
    const styles = createStyles(theme, colorScheme)
    const { todos, updateTodo, loading } = useTodos()
    const [title, setTitle] = useState('')

    useEffect(() => {
        const todo = todos.find((t: Todo) => t.id.toString() === id)
        setTitle(todo?.title || '')
    }, [todos, id])

    if ((!loaded && !error) || loading) {
        return <SafeAreaView style={styles.container}><ActivityIndicator size="large" color={theme.text} /></SafeAreaView>
    }

    const handleSave = async () => {
        const todo = todos.find((t: Todo) => t.id.toString() === id)
        if (!todo) return
        await updateTodo({ ...todo, title })
        router.push('/')
    }

    return (
        <SafeAreaView style={styles.container}>
            <InputBar
                value={title}
                onChangeText={setTitle}
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

function createStyles(theme: typeof lightTheme, colorScheme: string) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background
        }
    })
} 