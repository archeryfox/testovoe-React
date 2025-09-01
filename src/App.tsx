import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import type { Filter } from './types/filter';
import TodoItem from './components/TodoItem';
import TodoFooter from './components/TodoFooter';
import { useTodos, useFilteredTodos } from './hooks/useTodoHooks.ts';

export default function App() {
    const { todos, addTodo, toggleTodo, clearCompleted } = useTodos();
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
    const [isOpen, setIsOpen] = useState(true);
    const contentRef = useRef<HTMLUListElement>(null);
    const [height, setHeight] = useState<string | number>('auto');

    const filteredTodos = useFilteredTodos(filter);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, filteredTodos]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-[48em] bg-white rounded-xl shadow-xl overflow-hidden">
                <header className="text-center py-6">
                    <h1 className="text-8xl font-thin text-gray-300 text-pink-200">todos</h1>
                </header>

                <div className="px-6 pb-6">
                    {/* Поле ввода с иконкой слева */}
                    <div className="flex items-center mb-4">
                        <button
                            className="mr-2 flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 transition"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-200 ${
                                    isOpen ? 'rotate-90' : 'rotate-0'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <input
                            value={input}
                            placeholder="Что нужно сделать?"
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    if (!input.trim()) return;
                                    addTodo(input);
                                    setInput('');
                                    setIsOpen(true);
                                }
                            }}
                            className="flex-1 px-4 py-3 text-lg text-gray-800 border-b border-gray-300 placeholder-gray-400 placeholder:italic not-italic focus:outline-none"
                        />
                    </div>

                    <div
                        style={{maxHeight: height, transition: 'max-height 0.3s ease', overflow: 'hidden'}}
                    >
                        <ul ref={contentRef} className="divide-y divide-gray-200">
                            {filteredTodos.map(todo => (
                                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo}/>
                            ))}
                        </ul>
                    </div>

                    <TodoFooter
                        todos={todos}
                        filter={filter}
                        setFilter={setFilter}
                        clearCompleted={clearCompleted}
                    />
                </div>
            </div>
        </div>
    );
}
