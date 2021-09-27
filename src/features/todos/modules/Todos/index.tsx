import { useEffect, useState } from 'react';
import CreateTodoCard from 'features/todos/components/CreateTodoCard';
import {
  useResetTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from 'generated/graphql';
import keyBy from 'lodash/keyBy';
import TodoList from 'features/todos/components/TodoList';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const Todos = () => {
  // Local state
  const [todosById, setTodosById] = useState({});
  const [editId, setEditId] = useState(null);

  // GraphQL
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [resetTodo] = useResetTodoMutation();
  const { data, loading } = useTodosQuery();

  // Lifecycle
  useEffect(() => {
    const todos = data?.todos?.todos ?? [];

    setTodosById(keyBy(todos, 'id'));
  }, [data?.todos?.todos]);

  // Handlers
  const handleAddTodos = async (todo): void => {
    setTodosById((previousTodosById) => ({
      ...previousTodosById,
      [todo.id]: todo,
    }));
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    await deleteTodo({
      variables: {
        id,
      },
    });

    setTodosById((previousTodosById) => {
      delete previousTodosById[id];

      return { ...previousTodosById };
    });
  };

  const handleCompleteTodo = async (id: string): Promise<void> => {
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
  };

  const handleUpdateTodo = async (updatedTodo) => {
    setTodosById((previousTodosById) => {
      previousTodosById[updatedTodo.id] = { ...updatedTodo };

      return { ...previousTodosById };
    });

    setEditId(null);
  };

  const handleSetEdit = (id) => {
    setEditId(id);
  };

  const handleResetTodo = async (id) => {
    const response = await resetTodo({
      variables: {
        id,
      },
    });

    const updatedTodo = response.data?.resetTodo?.todo ?? {};

    setTodosById((previousTodosById) => {
      previousTodosById[id] = { ...updatedTodo };

      return { ...previousTodosById };
    });
  };

  return (
    <Container>
      <CreateTodoCard onCreate={handleAddTodos} />
      {loading ? (
        <Spinner />
      ) : (
        <TodoList
          editId={editId}
          todos={Object.values(todosById)}
          onDelete={handleDeleteTodo}
          onComplete={handleCompleteTodo}
          onUpdate={handleUpdateTodo}
          onSetEdit={handleSetEdit}
          onReset={handleResetTodo}
        />
      )}
    </Container>
  );
};

export default Todos;
