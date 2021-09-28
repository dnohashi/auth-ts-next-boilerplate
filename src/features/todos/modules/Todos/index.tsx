import { useEffect, useState } from 'react';
import CreateTodoCard from 'features/todos/components/CreateTodoCard';
import {
  Todo,
  useResetTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from 'generated/graphql';
import keyBy from 'lodash/keyBy';
import TodoList from 'features/todos/components/TodoList';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const Todos = (): JSX.Element => {
  // Local state
  const [todosById, setTodosById] = useState<Todo | unknown>({});
  const [editId, setEditId] = useState<string | null>(null);

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
  const handleAddTodos = (todo: Todo): void => {
    setTodosById((previousTodosById: Todo) => ({
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

    setTodosById((previousTodosById: Todo) => {
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

    setTodosById((previousTodosById: Todo) => {
      previousTodosById[id] = { ...completedTodo };

      return { ...previousTodosById };
    });
  };

  const handleUpdateTodo = (updatedTodo: Todo): void => {
    setTodosById((previousTodosById: Todo) => {
      previousTodosById[updatedTodo.id] = { ...updatedTodo };

      return { ...previousTodosById };
    });

    setEditId(null);
  };

  const handleSetEdit = (id: string): void => {
    setEditId(id);
  };

  const handleResetTodo = async (id: string): Promise<void> => {
    const response = await resetTodo({
      variables: {
        id,
      },
    });

    const updatedTodo = response.data?.resetTodo?.todo ?? {};

    setTodosById((previousTodosById: Todo) => {
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
