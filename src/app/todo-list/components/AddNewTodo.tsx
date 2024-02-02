'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IAddTodo {
  todo: string;
  refresh: () => void;
}

const addTodo = async ({ todo, refresh }: IAddTodo) => {
  await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: todo,
      completed: true,
      userId: 5,
    }),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      refresh();
    });
};

export default function AddNewTodo() {
  const router = useRouter();
  const [todoText, setTodoText] = useState('');

  return (
    <div className="mt-4">
      <input
        type="text"
        className="text-gray-800 py-1 px-2 rounded-sm text-sm"
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
      />
      <button
        className="ml-2 py-1 px-2 rounded bg-green-300 text-gray-800 text-sm"
        onClick={async () => {
          await addTodo({ todo: todoText, refresh: router.refresh });
          setTodoText('');
        }}
      >
        Add
      </button>
    </div>
  );
}
