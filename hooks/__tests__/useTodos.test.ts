import React from 'react';
import { render } from '@testing-library/react-native';
import { useTodos } from '../useTodos';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

function TestComponent() {
  const { todos, addTodo } = useTodos();
  React.useEffect(() => {
    addTodo('Novo todo');
  }, []);
  return <>{todos.length > 0 && todos[0].title}</>;
}

describe('useTodos', () => {
  it('adiciona um novo todo', async () => {
    const { findByText } = render(<TestComponent />);
    expect(await findByText('Novo todo')).toBeTruthy();
  });
}); 