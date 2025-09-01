import { create } from 'zustand';
import type { Todo } from '../types/todo';
import { loadTodos, saveTodos, addTodo as addTodoService, toggleTodo as toggleTodoService, clearCompleted as clearCompletedService } from '../services/todoService';

interface TodoState {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    clearCompleted: () => void;
    setTodos: (todos: Todo[]) => void;
}

const useTodoStore = create<TodoState>((set, get) => ({
    todos: loadTodos(),

    setTodos: (todos: Todo[]) => {
        set({ todos });
        saveTodos(todos);
    },

    addTodo: (text: string) => {
        const newTodos = addTodoService(get().todos, text);
        set({ todos: newTodos });
        saveTodos(newTodos);
    },

    toggleTodo: (id: number) => {
        const newTodos = toggleTodoService(get().todos, id);
        set({ todos: newTodos });
        saveTodos(newTodos);
    },

    clearCompleted: () => {
        const newTodos = clearCompletedService(get().todos);
        set({ todos: newTodos });
        saveTodos(newTodos);
    }
}));

export default useTodoStore;
