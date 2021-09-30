import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import {
  MutationUpdateTodoArgs,
  Todo,
  useUpdateTodoMutation,
} from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import Card from 'ui/components/Card';
import RowContainer from 'ui/components/RowContainer';
import { ICreateTodoFormInput } from '../interfaces';

interface IEditTodoCard {
  id: string;
  title: string;
  onUpdate: (todo: Todo) => void;
}

const EditTodoCard = ({ id, title, onUpdate }: IEditTodoCard): JSX.Element => {
  const [updateTodo] = useUpdateTodoMutation();

  const initialValues: ICreateTodoFormInput = {
    title,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });

  async function handleOnSubmit(
    values: ICreateTodoFormInput,
    { setErrors, setSubmitting }: FormikHelpers<any>
  ): Promise<void> {
    const variables: MutationUpdateTodoArgs = { id, data: { ...values } };
    const response = await updateTodo({
      variables,
    });

    const errors = response.data?.updateTodo.errors;
    const todo: Todo = response.data?.updateTodo.todo as Todo;

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
