import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export function loadTodos(): Todo[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveTodos(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function addTodo(todos: Todo[], text: string): Todo[] {
    if (!text.trim()) return todos;
    return [...todos, { id: Date.now(), text, completed: false }];
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
    return todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}

export function clearCompleted(todos: Todo[]): Todo[] {
    return todos.filter(t => !t.completed);
}
