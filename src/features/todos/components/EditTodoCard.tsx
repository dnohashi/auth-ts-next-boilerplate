import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import { Todo, useUpdateTodoMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import Card from 'ui/components/Card';
import RowContainer from 'ui/components/RowContainer';

interface IEditTodoCard {
  id: string;
  title: string;
  onUpdate: (todo: Todo) => void;
}

const EditTodoCard = ({ id, title, onUpdate }: IEditTodoCard): JSX.Element => {
  const [updateTodo] = useUpdateTodoMutation();

  const initialValues = {
    title,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });

  async function handleOnSubmit(values, { setErrors, setSubmitting }) {
    const response = await updateTodo({
      variables: {
        id,
        data: { ...values },
      },
    });

    const errors = response.data?.updateTodo.errors;
    const todo = response.data?.updateTodo.todo;

    if (errors) {
      setErrors(handleErrors(errors));
      setSubmitting(false);
    } else if (todo) {
      onUpdate(todo);
    }
  }

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {() => (
          <Form>
            <InputField name="title" label="Title" type="text" />
            <RowContainer justify="flex-end">
              <Button
                title="Save"
                variant="primary"
                size="large"
                type="submit"
              />
            </RowContainer>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EditTodoCard;
