import { useState } from 'react';
import CreateTodo from 'features/todos/components/CreateTodo';
import TodoList from 'features/todos/components/TodoList';
import Container from 'ui/components/Container';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  function addTodos(todo): void {
    setTodos((previousTodos) => [...previousTodos, todo]);
  }

  function deleteTodo(id: string): void {
    setTodos((previousTodos) =>
      previousTodos.filter((previousTodo) => previousTodo.id !== id)
    );
  }

  function completeTodo(id: string): void {
    // Add mutation here
    // Get response and update state with response
  }

  return (
    <Container>
      <CreateTodo onCreate={addTodos} />
      <TodoList todos={todos} onDelete={deleteTodo} onComplete={completeTodo} />
    </Container>
  );
};

export default Todos;
