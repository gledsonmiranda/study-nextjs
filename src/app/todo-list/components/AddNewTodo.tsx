'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IAddTodo {
  name: string;
  refresh: () => void;
}

const addTodo = async (item: IAddTodo) => {
  await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: item.name,
      completed: true,
      userId: 5,
    }),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      item.refresh();
    });
};

export default function AddNewTodo() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <div className="mt-4">
      <input
        type="text"
        className="text-gray-700 p-1"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button
        className="ml-2 p-2 rounded bg-slate-600"
        onClick={async () => {
          await addTodo({ name, refresh: router.refresh });
          setName('');
        }}
      >
        Add
      </button>
    </div>
  );
}
