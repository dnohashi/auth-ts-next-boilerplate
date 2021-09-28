import { useEffect, useMemo, useState } from 'react';
import CreateTodoCard from 'features/todos/components/CreateTodoCard';
import {
  MutationCompleteTodoArgs,
  MutationDeleteTodoArgs,
  MutationResetTodoArgs,
  Todo,
  useResetTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosLazyQuery,
} from 'generated/graphql';
import cloneDeep from 'lodash/cloneDeep';
import keyBy from 'lodash/keyBy';
import TodoList from 'features/todos/components/TodoList';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const MAX_LIMIT = 5;

const Todos = (): JSX.Element => {
  // Local state
  const [todosById, setTodosById] = useState({});
  const [editId, setEditId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [canPaginate, setCanPaginate] = useState(true);

  // GraphQL
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [resetTodo] = useResetTodoMutation();
  const [getTodos, { data, loading }] = useTodosLazyQuery();
  const memoizedTodos = useMemo(() => Object.values(todosById), [todosById]);

  // Lifecycle
  useEffect(() => {
    getTodos({ variables: { limit: MAX_LIMIT, offset } });
  }, []);

  useEffect(() => {
    const todos = data?.todos?.todos ?? [];

    // Add todos and update offset
    if (todos.length > 0 && canPaginate) {
      setTodosById({ ...todosById, ...keyBy(todos, 'id') });
      setOffset((prevOffset) => prevOffset + MAX_LIMIT);
    }

    // Restrict pagination if offset exceeds limit
    if (offset - memoizedTodos.length > MAX_LIMIT) {
      setCanPaginate(false);
    }
  }, [loading]);

  // Handlers
  const handleAddTodos = (todo: Todo): void => {
    const updatedTodosById = { [todo.id]: todo, ...(todosById as Todo) };

    setTodosById(updatedTodosById);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    const variables: MutationDeleteTodoArgs = { id };
    await deleteTodo({ variables });

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
    const variables: MutationCompleteTodoArgs = { id };
    const response = await completeTodo({
      variables,
    });

    const completedTodo = response.data?.completeTodo?.todo ?? {};

    updateTodoById(id, completedTodo as Todo);
  };

  const handleUpdateTodo = (updatedTodo: Todo): void => {
    updateTodoById(updatedTodo.id, updatedTodo);

    setEditId(null);
  };

  const handleResetTodo = async (id: string): Promise<void> => {
    const variables: MutationResetTodoArgs = { id };
    const response = await resetTodo({
      variables,
    });

    const updatedTodo = response.data?.resetTodo?.todo ?? ({} as Todo);

    updateTodoById(updatedTodo.id, updatedTodo as Todo);
  };

  const handleSetEdit = (id: string): void => {
    setEditId(id);
  };

  const fetchTodosWithOffset = async () => {
    await getTodos({ variables: { limit: MAX_LIMIT, offset } });

    setOffset((prevOffset) => prevOffset + MAX_LIMIT);
  };

  return (
    <Container>
      <CreateTodoCard onCreate={handleAddTodos} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              height: '40vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: `${
                offset > MAX_LIMIT ? 'column-reverse' : 'column'
              }`,
            }}
          >
            <TodoList
              editId={editId}
              todos={memoizedTodos as Todo[]}
              onDelete={handleDeleteTodo}
              onComplete={handleCompleteTodo}
              onUpdate={handleUpdateTodo}
              onSetEdit={handleSetEdit}
              onReset={handleResetTodo}
            />
          </div>
          <div style={{ marginTop: 4 }}>
            <Button
              disabled={!canPaginate}
              title="See more"
              variant={canPaginate ? 'primary' : undefined}
              size="large"
              onClick={fetchTodosWithOffset}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Todos;
