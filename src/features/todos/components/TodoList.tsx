import EditTodoCard from './EditTodoCard';
import Container from 'ui/components/Container';
import TodoCard from './TodoCard';

const TodoList = ({
  editId,
  todos,
  onComplete,
  onDelete,
  onReset,
  onSetEdit,
  onUpdate,
}) => {
  const handleOnComplete = (id) => () => {
    onComplete(id);
  };

  const handleOnDelete = (id) => () => {
    onDelete(id);
  };

  const handleOnSetEdit = (id) => () => {
    onSetEdit(id);
  };

  const handleOnReset = (id) => () => {
    onReset(id);
  };

  return (
    <Container>
      {todos.map(
        ({
          id,
          title,
          completedAt,
        }: {
          id: string;
          title: string;
          completedAt?: Date;
        }) =>
          editId === id ? (
            <EditTodoCard key={id} id={id} title={title} onUpdate={onUpdate} />
          ) : (
            <TodoCard
              key={id}
              title={title}
              completedAt={completedAt}
              onDelete={handleOnDelete(id)}
              onSetEdit={handleOnSetEdit(id)}
              onComplete={handleOnComplete(id)}
              onReset={handleOnReset(id)}
            />
          )
      )}
    </Container>
  );
};

export default TodoList;
