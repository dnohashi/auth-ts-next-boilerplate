import { Todo } from 'generated/graphql';
import EditTodoCard from './EditTodoCard';
import Container from 'ui/components/Container';
import TodoCard from './TodoCard';

interface ITodoListProps {
  editId?: string | null;
  todos: Todo[];
  onComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReset: (id: string) => Promise<void>;
  onSetEdit: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

const TodoList = ({
  editId,
  todos,
  onComplete,
  onDelete,
  onReset,
  onSetEdit,
  onUpdate,
}: ITodoListProps): JSX.Element => {
  return (
    <Container>
      {todos.map(({ id, title, completedAt }: Todo) =>
        editId === id ? (
          <EditTodoCard key={id} id={id} title={title} onUpdate={onUpdate} />
        ) : (
          <TodoCard
            key={id}
            title={title}
            completedAt={completedAt}
            onDelete={() => onDelete(id)}
            onSetEdit={() => onSetEdit(id)}
            onComplete={() => onComplete(id)}
            onReset={() => onReset(id)}
          />
        )
      )}
    </Container>
  );
};

export default TodoList;
