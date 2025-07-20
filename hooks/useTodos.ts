import { data as initialData } from '@/data/todos';
import todoService from '@/services/todoService';
import { useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storageTodos = await todoService.getAll();
      if (storageTodos && storageTodos.length) {
        setTodos(storageTodos.sort((a: Todo, b: Todo) => b.id - a.id));
      } else {
        setTodos(initialData.sort((a: Todo, b: Todo) => b.id - a.id));
      }
      setLoading(false);
    })();
  }, []);

  const addTodo = async (title: string) => {
    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    const newTodo: Todo = { id: newId, title, completed: false };
    const newTodos = await todoService.add(newTodo);
    setTodos(newTodos);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    const newTodos = await todoService.update(updatedTodo);
    setTodos(newTodos);
  };

  const removeTodo = async (id: number) => {
    const newTodos = await todoService.remove(id);
    setTodos(newTodos);
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const newTodos = await todoService.update(updatedTodo);
    setTodos(newTodos);
  };

  return { todos, addTodo, toggleTodo, removeTodo, updateTodo, loading };
} 