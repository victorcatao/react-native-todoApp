import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TodoApp';

const getAll = async () => {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

const saveAll = async (todos) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const add = async (todo) => {
  const todos = await getAll();
  const newTodos = [todo, ...todos];
  await saveAll(newTodos);
  return newTodos;
};

const update = async (updatedTodo) => {
  const todos = await getAll();
  const newTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
  await saveAll(newTodos);
  return newTodos;
};

const remove = async (id) => {
  const todos = await getAll();
  const newTodos = todos.filter(todo => todo.id !== id);
  await saveAll(newTodos);
  return newTodos;
};

export default { getAll, saveAll, add, update, remove }; 