import TodoListItem from "./TodoListItem";

interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const getTodos = async () => {
  const todos = await fetch('https://dummyjson.com/todos?limit=4');

  return todos.json();
};

export default async function TodoList() {
  const { todos } = await getTodos();

  console.log(todos)

  return (
    <div className="mt-4">
      <ul>
        {todos.map((item: ITodo) => {
          return <TodoListItem key={item.id} item={item} />
        })}
      </ul>
    </div>
  );
}
