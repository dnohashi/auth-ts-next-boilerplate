import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import Typography from 'ui/components/Typography';
import {
  MutationCreateTodoArgs,
  Todo,
  useCreateTodoMutation,
} from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import Card from 'ui/components/Card';
import RowContainer from 'ui/components/RowContainer';
import { ICreateTodoFormInput } from '../interfaces';

interface ICreateTodoCardProps {
  onCreate: (todo: Todo) => void;
}

const CreateTodo = ({ onCreate }: ICreateTodoCardProps): JSX.Element => {
  const [createTodo] = useCreateTodoMutation();

  const initialValues: ICreateTodoFormInput = {
    title: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });

  async function handleOnSubmit(
    values: ICreateTodoFormInput,
    { resetForm, setErrors, setSubmitting }: FormikHelpers<any>
  ): Promise<void> {
    const variables: MutationCreateTodoArgs = { data: { ...values } };
    const response = await createTodo({
      variables,
    });

    const errors = response.data?.createTodo.errors;
    const todo: Todo = response.data?.createTodo.todo as Todo;

    if (errors) {
      setErrors(handleErrors(errors));
      setSubmitting(false);
    } else if (todo) {
      onCreate(todo as Todo);
      resetForm(initialValues as any);
    }
  }

  return (
    <Card>
      <Typography as="h3" fontSize={24} align="center" fontWeight={700}>
        Add Todo
      </Typography>
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
                title="Create"
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

export default CreateTodo;
