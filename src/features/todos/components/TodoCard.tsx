import { Todo } from 'generated/graphql';

import Button from 'ui/components/Button';
import Card from 'ui/components/Card';
import RowContainer from 'ui/components/RowContainer';
import Typography from 'ui/components/Typography';

interface TodoCardProps {
  completedAt?: Date;
  title: string;
  onDelete: (id: string) => void;
  onReset: (id: string) => void;
  onSetEdit: (id: string) => void;
  onComplete: (todo: Todo) => Promise<void>;
}

const TodoCard = ({
  completedAt,
  title,
  onDelete,
  onSetEdit,
  onComplete,
  onReset,
}: TodoCardProps): JSX.Element => {
  return (
    <Card>
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
            <Button title="Edit" size="large" onClick={onSetEdit} />
            <Button
              title={completedAt ? 'Reset' : 'Complete'}
              variant="primary"
              size="large"
              onClick={completedAt ? onReset : onComplete}
            />
          </RowContainer>
        </span>
      </RowContainer>
    </Card>
  );
};

export default TodoCard;
