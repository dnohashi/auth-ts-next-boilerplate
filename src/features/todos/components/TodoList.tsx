// import List from 'ui/components/List'
// import Card from 'ui/components/Card'

const TodoList = ({ todos, onComplete, onDelete }) => {
  const handleOnComplete = (id) => () => {
    onComplete(id);
  };

  const handleOnDelete = (id) => () => {
    onDelete(id);
  };
  /*
		<List>
			{todos.forEach(({ id, title, createdAt, updatedAt, deletedAt, completedAt }) => (
				<Card 
					title={title}
					createdAt={createdAt}
					updatedAt={updatedAt}
					deletedAt={deletedAt}
					completedAt={completedAt}
					onComplete={handleOnComplete(id)}
					onDelete={handleOnDelete(id)}
				/>
			)}
		</List>
	*/
  return <div></div>;
};

export default TodoList;
