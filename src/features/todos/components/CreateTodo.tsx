import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import Typography from 'ui/components/Typography';
import { CreateTodoDocument, useCreateTodoMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import RowContainer from 'ui/components/RowContainer';

const CreateTodo = ({ onCreate = () => {} }): JSX.Element => {
  const [createTodo] = useCreateTodoMutation();

  function handleClearInputs() {}

  return (
    <div style={{ width: '100%' }}>
      <Typography as="h3" fontSize={24} align="center" fontWeight={700}>
        Add Todo
      </Typography>
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required(),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await createTodo({
            variables: {
              title: values.title,
            },
            awaitRefetchQueries: true,
          });

          console.log('RESPONSE: ', response);

          // const errors = response.data?.todo.errors;

          // if (errors) {
          //   setErrors(handleErrors(errors));
          //   setSubmitting(false);
          // } else if (response.data?.todo) {
          //   // Push to todos
          // onCreate
          // }
        }}
      >
        {() => (
          <Form>
            <InputField name="title" label="Title" type="text" />
            <RowContainer>
              <Button title="Clear" size="large" onClick={handleClearInputs} />
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
    </div>
  );
};

export default CreateTodo;
