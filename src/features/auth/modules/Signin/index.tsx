import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Layout from 'features/auth/components/Layout';
import Button from 'ui/components/Button';
import InputField from 'ui/components/InputField';
import { useRouter } from 'next/router';
import { MeDocument, useSigninMutation } from 'generated/graphql';
import handleErrors from 'helpers/handleErrors';
import useAuth from 'features/auth/hooks/useAuth';
import Loading from 'ui/components/Loading';

const Signin = () => {
  const router = useRouter();
  const [signin] = useSigninMutation();
  const { data, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!loading && data?.me?.user) {
    router.push('/');
    return null;
  }

  function handleNavigationToSignUp() {
    router.push('/signup');
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const res = await signin({
            variables: {
              params: {
                email: values.email,
                password: values.password,
              },
            },
            awaitRefetchQueries: true,
            refetchQueries: [
              {
                query: MeDocument,
              },
            ],
          });

          if (res.data?.signin.errors) {
            setErrors(handleErrors(res.data.signin.errors));
            setSubmitting(false);
          } else if (res.data?.signin.user) {
            router.push('/');
          }
        }}
      >
        {() => (
          <Form>
            <InputField name="email" label="Email" type="email" />
            <InputField name="password" label="Password" type="password" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                title="Need an account?"
                size="large"
                onClick={handleNavigationToSignUp}
              />
              <Button
                title="Sign In"
                variant="primary"
                size="large"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Signin;
