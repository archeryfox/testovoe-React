import type {Todo} from "../types/todo.tsx";

type Props = {
    todo: Todo;
    onToggle: (id: number) => void;
};

export default function TodoItem({ todo, onToggle }: Props) {
    return (
        <li className="flex items-center justify-between py-3">
            <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className="w-5 h-5 rounded-full border border-gray-300 bg-white appearance-none cursor-pointer"
                    />
                    {todo.completed && (
                        <svg
                            className="absolute w-3 h-3 left-1 top-1 text-green-500 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
                <span className={`${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {todo.text}
                </span>
            </label>
        </li>
    );
}
