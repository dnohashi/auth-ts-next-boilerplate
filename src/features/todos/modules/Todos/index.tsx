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
import RowContainer from 'ui/components/RowContainer';
import { PaginationControlsProps } from 'ui/components/PaginationControls';

const MAX_LIMIT = 5;

const Todos = ({
  currentPage,
  totalItems,
  onResetCurrentPage,
  onSetTotalItems,
  onNext,
  onPrevious,
}: PaginationControlsProps): JSX.Element => {
  // Local state
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextDisabled, setNextDisabled] = useState(false);

  // GraphQL
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [resetTodo] = useResetTodoMutation();
  const { loading, error, fetchMore } = useTodosQuery({
    variables: { limit: MAX_LIMIT, offset: 0 },
    onCompleted: (response) => {
      const todosFromServer = (response?.todos?.todos ?? []) as Todo[];
      const totalItems: number = response?.todos?.count ?? 0;

      if (todosFromServer.length >= totalItems) {
        setNextDisabled(true);
      }

      if (todosFromServer.length) {
        setTodos(todosFromServer);
      }

      onSetTotalItems(totalItems);
    },
  });

  // Handlers
  const handleAddTodos = (): void => {
    onResetCurrentPage();
    fetchAdditionalTodos(0, false);
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    const variables: MutationDeleteTodoArgs = { id };
    const expectedCount = totalItems - 1;
    const willDecrementTotalPages = currentPage * MAX_LIMIT >= expectedCount;
    const offset =
      (willDecrementTotalPages ? currentPage - 1 : currentPage) * MAX_LIMIT;

    await deleteTodo({ variables });

    fetchAdditionalTodos(offset, willDecrementTotalPages);
    willDecrementTotalPages && onPrevious();
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

  // Pagination
  const fetchAdditionalTodos = async (
    fetchOffset: number,
    shouldDisable: boolean
  ) => {
    const response = await fetchMore({
      variables: { limit: MAX_LIMIT, offset: fetchOffset },
    });

    const additionalTodos = response?.data?.todos?.todos as Todo[];
    const count = response.data?.todos?.count ?? totalItems;

    if (additionalTodos.length < MAX_LIMIT || shouldDisable) {
      setNextDisabled(true);
    } else if (nextDisabled) {
      setNextDisabled(false);
    }

    if (additionalTodos?.length) {
      setTodos(additionalTodos);
    }

    onSetTotalItems(count);
  };

  const handleOnClickPrevious = async () => {
    const offset = (currentPage - 1) * MAX_LIMIT;
    const shouldDisableNext = false;

    await fetchAdditionalTodos(offset, shouldDisableNext);
    onPrevious();
  };

  const handleOnClickNext = async () => {
    const offset = (currentPage + 1) * MAX_LIMIT;
    const shouldDisableNext = MAX_LIMIT + offset >= totalItems;

    await fetchAdditionalTodos(offset, shouldDisableNext);
    onNext();
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
          flexDirection: 'column',
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
      <div style={{ marginTop: 12, width: '100%' }}>
        <RowContainer>
          <Button
            disabled={currentPage === 0}
            title="Go back"
            size="large"
            onClick={handleOnClickPrevious}
          />
          <Button
            disabled={nextDisabled}
            title="Go forward"
            size="large"
            onClick={handleOnClickNext}
          />
        </RowContainer>
      </div>
    </Container>
  );
};

export default Todos;
