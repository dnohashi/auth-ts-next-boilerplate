import Button from 'ui/components/Button';
import Card from 'ui/components/Card';
import Container from 'ui/components/Container';
import RowContainer from 'ui/components/RowContainer';
import Typography from 'ui/components/Typography';

const TodoList = ({ todos, onComplete, onDelete, onEdit }) => {
  const handleOnComplete = (id) => () => {
    onComplete(id);
  };

  const handleOnDelete = (id) => () => {
    onDelete(id);
  };

  return (
    <Container>
      {todos.map(
        ({ id, title, completedAt }: { id: string; title: string }) => (
          <Card key={id}>
            <Typography as="h4" fontSize={20}>
              <b>Title:</b> {title}
            </Typography>
            <Typography as="h4" fontSize={20}>
              <b>Status:</b> {completedAt ? 'Completed' : 'In Progress'}
            </Typography>
            <RowContainer>
              <Button
                title="Delete"
                size="large"
                variant="ghost"
                onClick={onDelete}
              />
              <span style={{ width: '30%' }}>
                <RowContainer>
                  <Button title="Edit" size="large" onClick={onComplete} />
                  <Button
                    title="Complete"
                    variant="primary"
                    size="large"
                    onClick={onComplete}
                  />
                </RowContainer>
              </span>
            </RowContainer>
          </Card>
        )
      )}
    </Container>
  );
};

export default TodoList;
