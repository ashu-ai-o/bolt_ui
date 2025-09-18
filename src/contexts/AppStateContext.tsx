import React, { createContext, useContext, useState } from 'react';

interface FileType {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileType[];
  icon?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AppStateType {
  currentProject: string;
  files: FileType[];
  activeFile: string | null;
  chatMessages: ChatMessage[];
  isGenerating: boolean;
  activeTab: 'Code' | 'Preview';
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveFile: (fileId: string | null) => void;
  setActiveTab: (tab: 'Code' | 'Preview') => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setIsGenerating: (generating: boolean) => void;
}

const AppStateContext = createContext<AppStateType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [currentProject] = useState('Zenflow - Lovable Productivity App');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFile, setActiveFile] = useState<string | null>('app-context');
  const [activeTab, setActiveTab] = useState<'Code' | 'Preview'>('Code');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [files] = useState<FileType[]>([
    {
      id: 'bolt',
      name: '.bolt',
      type: 'folder',
      path: '/.bolt',
      children: []
    },
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          id: 'app-context',
          name: 'AppContext.tsx',
          type: 'file',
          path: '/src/AppContext.tsx',
          content: `import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { Task, Habit, User, Page } from '../types';

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  
  // Habits
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'completedToday'>) => void;
  toggleHabit: (habitId: string) => void;
  
  // User
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currentPage,
      setCurrentPage,
      tasks,
      addTask,
      toggleTask,
      deleteTask,
      habits,
      addHabit,
      toggleHabit,
      user,
      updateUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};`
        }
      ]
    },
    {
      id: 'hooks',
      name: 'hooks',
      type: 'folder',
      path: '/hooks',
      children: [
        {
          id: 'use-local-storage',
          name: 'useLocalStorage.ts',
          type: 'file',
          path: '/hooks/useLocalStorage.ts',
          content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}`
        },
        {
          id: 'use-theme',
          name: 'useTheme.ts',
          type: 'file',
          path: '/hooks/useTheme.ts',
          content: `import { useLocalStorage } from './useLocalStorage';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}`
        }
      ]
    },
    {
      id: 'types',
      name: 'types',
      type: 'folder',
      path: '/types',
      children: [
        {
          id: 'app-types',
          name: 'App.tsx',
          type: 'file',
          path: '/types/App.tsx',
          content: `export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  completedToday: boolean;
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
}

export type Page = 'dashboard' | 'tasks' | 'habits' | 'settings';`
        },
        {
          id: 'index-types',
          name: 'index.css',
          type: 'file',
          path: '/types/index.css',
          content: `export * from './App';`
        },
        {
          id: 'main-types',
          name: 'main.tsx',
          type: 'file',
          path: '/types/main.tsx',
          content: `// Main type definitions`
        },
        {
          id: 'vite-env-types',
          name: 'vite-env.d.ts',
          type: 'file',
          path: '/types/vite-env.d.ts',
          content: `/// <reference types="vite/client" />`
        }
      ]
    },
    {
      id: 'gitignore',
      name: '.gitignore',
      type: 'file',
      path: '/.gitignore',
      content: `node_modules/
dist/
.env`
    },
    {
      id: 'eslint-config',
      name: 'eslint.config.js',
      type: 'file',
      path: '/eslint.config.js',
      content: `export default {
  extends: ['eslint:recommended'],
  rules: {}
};`
    },
    {
      id: 'index-html',
      name: 'index.html',
      type: 'file',
      path: '/index.html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zenflow</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
    },
    {
      id: 'package-json',
      name: 'package.json',
      type: 'file',
      path: '/package.json',
      content: `{
  "name": "zenflow",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.2"
  }
}`
    },
    {
      id: 'package-lock',
      name: 'package-lock.json',
      type: 'file',
      path: '/package-lock.json',
      content: `{}`
    },
    {
      id: 'postcss-config',
      name: 'postcss.config.js',
      type: 'file',
      path: '/postcss.config.js',
      content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`
    },
    {
      id: 'tailwind-config',
      name: 'tailwind.config.js',
      type: 'file',
      path: '/tailwind.config.js',
      content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
    },
    {
      id: 'tsconfig-app',
      name: 'tsconfig.app.json',
      type: 'file',
      path: '/tsconfig.app.json',
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`
    },
    {
      id: 'tsconfig',
      name: 'tsconfig.json',
      type: 'file',
      path: '/tsconfig.json',
      content: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`
    },
    {
      id: 'tsconfig-node',
      name: 'tsconfig.node.json',
      type: 'file',
      path: '/tsconfig.node.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`
    },
    {
      id: 'vite-config',
      name: 'vite.config.ts',
      type: 'file',
      path: '/vite.config.ts',
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`
    }
  ]);

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...message
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppStateContext.Provider value={{
      currentProject,
      files,
      activeFile,
      chatMessages,
      isGenerating,
      activeTab,
      sidebarCollapsed,
      setSidebarCollapsed,
      setActiveFile,
      setActiveTab,
      addChatMessage,
      setIsGenerating
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};