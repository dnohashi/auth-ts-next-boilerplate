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
  onResetCurrentPage,
  onNext,
  onPrevious,
}: PaginationControlsProps): JSX.Element => {
  // Local state
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [editId, setEditId] = useState<string | null>(null);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [totalItems, setTotalItems] = useState(1);

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

      setTotalItems(totalItems);
    },
  });

  // Handlers
  // Fetch with offset 0 and set page to 1 in order to fetch most recent subset
  const handleAddTodos = (): void => {
    onResetCurrentPage();
    fetchAdditionalTodos(0, false);
  };

  // Make request to set deletedAt and update state and pagination
  const handleDeleteTodo = async (id: string): Promise<void> => {
    const variables: MutationDeleteTodoArgs = { id };
    const expectedCount: number = totalItems - 1;
    // Decrement if expected count is at the boundary of the current page
    const willDecrementTotalPages = currentPage * MAX_LIMIT === expectedCount;
    const offset =
      (willDecrementTotalPages ? currentPage - 1 : currentPage) * MAX_LIMIT;

    await deleteTodo({ variables });

    fetchAdditionalTodos(offset, willDecrementTotalPages);
    willDecrementTotalPages && onPrevious();
  };

  // Find todo to update by ID and replace
  const updateTodo = (id: string, todo: Todo = {} as Todo): void => {
    const clonedTodos = cloneDeep(todos);
    const index = clonedTodos.findIndex((clonedTodo) => clonedTodo.id === id);

    clonedTodos[index] = { ...todo };

    setTodos(clonedTodos);
  };

  // Make request to patch a Todo
  const handleCompleteTodo = async (id: string): Promise<void> => {
    const variables: MutationCompleteTodoArgs = { id };
    const response = await completeTodo({
      variables,
    });
    const completedTodo = response.data?.completeTodo?.todo ?? {};

    updateTodo(id, completedTodo as Todo);
  };

  // Make request to patch Todo and reset edited card
  const handleUpdateTodo = (updatedTodo: Todo): void => {
    updateTodo(updatedTodo.id, updatedTodo);
    setEditId(null);
  };

  // Make request to patch Todo
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
  // Request list with limit and offset
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

    setTotalItems(count);
  };

  // Determine offset and make request to fetch previous page of Todos
  const handleOnClickPrevious = async () => {
    const offset = (currentPage - 1) * MAX_LIMIT;
    const shouldDisableNext = false;
    await fetchAdditionalTodos(offset, shouldDisableNext);
    onPrevious();
  };

  // Determine offset and make request to fetch next page of Todos
  // Disable if subsequent fetch will exceed total records
  const handleOnClickNext = async () => {
    const offset = (currentPage + 1) * MAX_LIMIT;
    // Disable if max capcity of next page is >= to total
    const shouldDisableNext =
      offset >= totalItems || offset + MAX_LIMIT >= totalItems;

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
