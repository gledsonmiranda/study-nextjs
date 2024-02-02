import TodoListItem from './TodoListItem';

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}

const getTodos = async () => {
  const todos = await fetch('https://dummyjson.com/todos?limit=4');

  return todos.json();
};

export default async function TodoList() {
  const { todos } = await getTodos();

  return (
    <div className="mt-4">
      <ul>
        {todos.map((item: ITodo) => {
          return <TodoListItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
}
