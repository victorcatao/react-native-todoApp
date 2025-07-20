# CrudApp

## Arquitetura

- **app/**: Telas e rotas principais (seguindo convenção do Expo Router)
- **components/**: Componentes reutilizáveis de UI
- **hooks/**: Hooks customizados (ex: useTodos)
- **services/**: Serviços de dados (ex: todoService)
- **context/**: Contextos globais (ex: ThemeContext)
- **styles/**: Temas e tokens globais
- **data/**: Dados mockados

## Hooks Customizados

### useTodos
Centraliza toda a lógica de manipulação dos todos (buscar, adicionar, editar, remover, persistir). Exemplo de uso:

```js
import { useTodos } from '@/hooks/useTodos';
const { todos, addTodo, toggleTodo, removeTodo, updateTodo, loading } = useTodos();
```

## Como rodar o projeto

```sh
npm install
npm start
```

## Como testar

- (Opcional) Adicione testes com Jest e Testing Library para hooks e componentes.

## Temas

Os temas globais estão em `styles/theme.ts` e podem ser expandidos conforme necessário.
