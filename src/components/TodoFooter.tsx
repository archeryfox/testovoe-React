import type {Todo} from "../types/todo.tsx";
import type {Filter} from "../types/filter.tsx";


type Props = {
    todos: Todo[];
    filter: Filter;
    setFilter: (f: Filter) => void;
    clearCompleted: () => void;
};

export default function TodoFooter({ todos, filter, setFilter, clearCompleted }: Props) {
    return (
        <footer className="mt-4 flex items-center justify-between text-gray-400 text-sm relative">
            <span>{todos.filter(t => !t.completed).length} задач осталось</span>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2">
                {(["all", "active", "completed"] as Filter[]).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-2 py-1 rounded ${
                            filter === f ? "border border-gray-300 bg-gray-100" : "hover:bg-gray-50"
                        }`}
                    >
                        {f === "all" ? "Все" : f === "active" ? "Активные" : "Завершённые"}
                    </button>
                ))}
            </div>
            <button
                onClick={clearCompleted}
                className="px-2 py-1 rounded hover:text-red-500"
            >
                Очистить завершённые
            </button>
        </footer>
    );
}
