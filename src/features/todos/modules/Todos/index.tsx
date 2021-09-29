import { useState } from 'react';
import CreateTodoCard from 'features/todos/components/CreateTodoCard';
import {
  MutationCompleteTodoArgs,
  MutationDeleteTodoArgs,
  MutationResetTodoArgs,
  Todo,
  useResetTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from 'generated/graphql';
import cloneDeep from 'lodash/cloneDeep';
import TodoList from 'features/todos/components/TodoList';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import Spinner from 'ui/components/Spinner';

const MAX_LIMIT = 5;

const Todos = (): JSX.Element => {
  // Local state
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [offset, setOffset] = useState(MAX_LIMIT);
  const [canPaginate, setCanPaginate] = useState(true);

  // GraphQL
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [resetTodo] = useResetTodoMutation();
  const { loading, error, fetchMore } = useTodosQuery({
    variables: { limit: MAX_LIMIT, offset: 0 },
    onCompleted: (response) => {
      const todosFromServer = response?.todos?.todos ?? ([] as Todo[]);

      setTodos([...todos, ...todosFromServer]);
    },
  });

  // Handlers
  const handleAddTodos = (todo: Todo): void => {
    setTodos([todo, ...todos]);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    const variables: MutationDeleteTodoArgs = { id };

    await deleteTodo({ variables });

    const clonedTodos: Todo[] = cloneDeep(todos);
    const index = clonedTodos.findIndex((clonedTodo) => clonedTodo.id === id);

    clonedTodos.splice(index, 1);

    setTodos(clonedTodos);
  };

  const updateTodo = (id: string, todo: Todo = {} as Todo): void => {
    const clonedTodos = cloneDeep(todos);
    const index = clonedTodos.findIndex((clonedTodo) => clonedTodo.id === id);

    clonedTodos[index] = { ...todo };

    setTodos(clonedTodos);
  };

  const handleCompleteTodo = async (id: string): Promise<void> => {
    const variables: MutationCompleteTodoArgs = { id };
    const response = await completeTodo({
      variables,
    });
    const completedTodo = response.data?.completeTodo?.todo ?? {};

    updateTodo(id, completedTodo as Todo);
  };

  const handleUpdateTodo = (updatedTodo: Todo): void => {
    updateTodo(updatedTodo.id, updatedTodo);
    setEditId(null);
  };

  const handleResetTodo = async (id: string): Promise<void> => {
    const variables: MutationResetTodoArgs = { id };
    const response = await resetTodo({
      variables,
    });
    const updatedTodo = response.data?.resetTodo?.todo ?? ({} as Todo);

    updateTodo(updatedTodo.id, updatedTodo as Todo);
  };

  const handleSetEdit = (id: string): void => {
    setEditId(id);
  };

  const fetchAdditionalTodos = async () => {
    const response = await fetchMore({
      variables: { limit: MAX_LIMIT, offset },
    });
    const additionalTodos = response?.data?.todos?.todos;

    setTodos([...todos, ...additionalTodos]);
    setOffset((prevOffset) => prevOffset + MAX_LIMIT);

    if (additionalTodos?.length < MAX_LIMIT) {
      setCanPaginate(false);
    }
  };

  if (loading || error) {
    return <Spinner />;
  }

  return (
    <Container>
      <CreateTodoCard onCreate={handleAddTodos} />
      <div
        style={{
          height: '40vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: `${offset > MAX_LIMIT ? 'column-reverse' : 'column'}`,
        }}
      >
        <TodoList
          editId={editId}
          todos={todos}
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
          onClick={fetchAdditionalTodos}
        />
      </div>
    </Container>
  );
};

export default Todos;
