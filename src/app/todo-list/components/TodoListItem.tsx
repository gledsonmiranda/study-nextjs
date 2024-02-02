'use client';

import { useRouter } from 'next/navigation';
import { ITodo } from './TodoList';

interface Props {
  item: ITodo;
}

interface UpdateTodo {
  id: number;
  completed?: boolean;
  refresh?: () => void;
}

const update = async ({ id, completed, refresh }: UpdateTodo) => {
  await fetch(`https://dummyjson.com/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (!refresh) return;

      refresh();
    });
};

const deleteTodo = async ({ id, refresh }: UpdateTodo) => {
  await fetch(`https://dummyjson.com/todos/${id}`, {
    method: 'DELETE',
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (!refresh) return;

      refresh();
    });
};
export default function TodoListItem({ item }: Props) {
  const router = useRouter();
  const { id, todo, completed } = item;

  return (
    <li className="mt-2">
      <input
        type="checkbox"
        className="cursor-pointer"
        onChange={(e) =>
          update({
            id: id,
            completed: e.target.checked,
            refresh: router.refresh,
          })
        }
        checked={completed}
      />
      <span className="text-sm ml-2">{todo}</span>
      <button
        className="ml-2 py-1 px-2 rounded bg-red-300 text-gray-800 text-sm"
        onClick={() => deleteTodo({ id, refresh: router.refresh })}
      >
        Delete
      </button>
    </li>
  );
}
