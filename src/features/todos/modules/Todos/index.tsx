import { useEffect, useMemo, useState } from 'react';
import CreateTodoCard from 'features/todos/components/CreateTodoCard';
import {
  Todo,
  useResetTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from 'generated/graphql';
import cloneDeep from 'lodash/cloneDeep';
import keyBy from 'lodash/keyBy';
import TodoList from 'features/todos/components/TodoList';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const Todos = (): JSX.Element => {
  // Local state
  const [todosById, setTodosById] = useState({});
  const [editId, setEditId] = useState<string | null>(null);

  // GraphQL
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [resetTodo] = useResetTodoMutation();
  const { data, loading } = useTodosQuery();

  const memoizedTodos = useMemo(() => Object.values(todosById), [todosById]);

  // Lifecycle
  useEffect(() => {
    const todos = data?.todos?.todos ?? [];

    setTodosById(keyBy(todos, 'id'));
  }, [data?.todos?.todos]);

  // Handlers
  const handleAddTodos = (todo: Todo): void => {
    const updatedTodosById = { [todo.id]: todo, ...(todosById as Todo) };

    setTodosById(updatedTodosById);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    await deleteTodo({
      variables: {
        id,
      },
    });

    const clonedTodosById: Todo = cloneDeep(todosById as Todo);
    delete clonedTodosById[id];

    setTodosById(clonedTodosById);
  };

  const updateTodoById = (id: string, todo: Todo = {} as Todo): void => {
    const clonedTodosById = cloneDeep(todosById);

    clonedTodosById[id] = todo;

    setTodosById(clonedTodosById);
  };

  const handleCompleteTodo = async (id: string): Promise<void> => {
    const response = await completeTodo({
      variables: {
        id,
      },
    });

    const completedTodo = response.data?.completeTodo?.todo ?? {};

    updateTodoById(id, completedTodo as Todo);
  };

  const handleUpdateTodo = (updatedTodo: Todo): void => {
    updateTodoById(updatedTodo.id, updatedTodo);

    setEditId(null);
  };

  const handleResetTodo = async (id: string): Promise<void> => {
    const response = await resetTodo({
      variables: {
        id,
      },
    });

    const updatedTodo = response.data?.resetTodo?.todo ?? ({} as Todo);

    updateTodoById(updatedTodo.id, updatedTodo as Todo);
  };

  const handleSetEdit = (id: string): void => {
    setEditId(id);
  };

  return (
    <Container>
      <CreateTodoCard onCreate={handleAddTodos} />
      {loading ? (
        <Spinner />
      ) : (
        <TodoList
          editId={editId}
          todos={memoizedTodos as Todo[]}
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
