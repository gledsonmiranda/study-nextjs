import AddNewTodo from './components/AddNewTodo';
import TodoList from './components/TodoList';

export default function TodoListPage() {
  return (
    <div className="m-8">
      <h1 className="text-4xl">Todo app</h1>
      <AddNewTodo />
      <TodoList />
    </div>
  );
}
