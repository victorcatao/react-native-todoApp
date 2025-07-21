# CrudApp

A modern React Native + Expo CRUD app with clean architecture, TypeScript, and theming.

## Project Structure

- **app/**: Main screens and routes (Expo Router convention)
- **components/**: Reusable UI components (TypeScript)
- **hooks/**: Custom hooks (e.g., useTodos)
- **services/**: Data services (e.g., todoService for AsyncStorage)
- **context/**: Global contexts (e.g., ThemeContext)
- **styles/**: Global themes and tokens
- **data/**: Mocked data
- **assets/**: Images and fonts used in the app

## Features
- TypeScript-first codebase
- Centralized theme and color management
- Custom hooks for business logic
- AsyncStorage for persistent todos
- Cleaned up unused files and assets
- Expo Router for navigation

## Usage

### Install dependencies
```sh
npm install
```

### Start the app
```sh
npm start
```

### Lint
```sh
npm run lint
```

## Custom Hooks Example

```ts
import { useTodos } from '@/hooks/useTodos';
const { todos, addTodo, toggleTodo, removeTodo, updateTodo, loading } = useTodos();
```

## Theming

Global themes are defined in `styles/theme.ts` and can be extended as needed.

## Cleaning
- Unused images, JS/JSX files, and legacy code have been removed for a clean, maintainable codebase.

---

Feel free to contribute or adapt this structure for your own Expo/React Native projects.
