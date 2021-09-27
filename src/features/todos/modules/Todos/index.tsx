import { useEffect, useState } from 'react';
import CreateTodo from 'features/todos/components/CreateTodo';
import {
  useUpdateTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from 'generated/graphql';
import keyBy from 'lodash/keyBy';
import TodoList from 'features/todos/components/TodoList';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const Todos = () => {
  const [todosById, setTodosById] = useState({});
  const [updateTodo] = useUpdateTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { data, loading } = useTodosQuery();

  useEffect(() => {
    const todos = data?.todos?.todos ?? [];

    setTodosById(keyBy(todos, 'id'));
  }, [data?.todos?.todos]);

  async function handleAddTodos(todo): void {
    setTodosById((previousTodosById) => ({
      ...previousTodosById,
      [todo.id]: todo,
    }));
  }

  async function handleDeleteTodo(id: string): Promise<void> {
    await deleteTodo({
      variables: {
        id,
      },
    });

    setTodosById((previousTodosById) => delete previousTodosById[id]);
  }

  async function handleCompleteTodo(id: string): Promise<void> {
    const response = await completeTodo({
      variables: {
        id,
      },
    });

    const completedTodo = response.data?.completeTodo?.todo ?? {};

    setTodosById((previousTodosById) => {
      previousTodosById[id] = { ...completedTodo };

      return { ...previousTodosById };
    });
  }

  async function handleEditTodo(id, data) {
    const response = await updateTodo({
      variables: {
        id,
        data,
      },
    });

    const updatedTodo = response.data?.updateTodo?.todo ?? {};

    setTodosById((previousTodosById) => {
      previousTodosById[id] = { ...updatedTodo };

      return { ...previousTodosById };
    });
  }

  return (
    <Container>
      <CreateTodo onCreate={handleAddTodos} />
      {loading ? (
        <Spinner />
      ) : (
        <TodoList
          todos={Object.values(todosById)}
          onDelete={handleDeleteTodo}
          onComplete={handleCompleteTodo}
          onEdit={handleEditTodo}
        />
      )}
    </Container>
  );
};

export default Todos;
