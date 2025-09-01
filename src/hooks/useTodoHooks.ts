import useTodoStore from '../store/todoStore';

export function useTodos() {
    const todos = useTodoStore(state => state.todos);
    const addTodo = useTodoStore(state => state.addTodo);
    const toggleTodo = useTodoStore(state => state.toggleTodo);
    const clearCompleted = useTodoStore(state => state.clearCompleted);

    return { todos, addTodo, toggleTodo, clearCompleted };
}

export function useFilteredTodos(filter: string) {
    const { todos } = useTodos();

    return todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
}
