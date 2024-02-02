'use client';

import { useRouter } from 'next/navigation';

interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface Props {
  item: ITodo;
}

interface UpdateTodo {
  id: number;
  status?: boolean;
  refresh?: () => void;
}

const update = async (item: UpdateTodo) => {
  await fetch(`https://dummyjson.com/todos/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: item.status }),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (!item.refresh) return;

      item?.refresh();
    });
};

const deleteTodo = async (item: UpdateTodo) => {
  await fetch(`https://dummyjson.com/todos/${item.id}`, {
    method: 'DELETE',
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      if (!item.refresh) return;

      item.refresh();
    });
};
export default function TodoListItem({ item }: Props) {
  const router = useRouter();

  return (
    <li className="text-sm mt-2">
      <input
        type="checkbox"
        className="mr-2"
        onChange={(e) =>
          update({
            id: item.id,
            status: e.target.checked,
            refresh: router.refresh,
          })
        }
        checked={item.completed}
      />
      {item.todo}
      <button
        className="ml-2 p-2 rounded bg-slate-600"
        onClick={() => deleteTodo({ id: item.id, refresh: router.refresh })}
      >
        Delete
      </button>
    </li>
  );
}
