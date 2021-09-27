import { useApolloClient } from '@apollo/client';
import useAuth from 'features/auth/hooks/useAuth';
import Todos from 'features/todos/modules/Todos';
import { useLogoutMutation } from 'generated/graphql';
import { useRouter } from 'next/router';
import Button from 'ui/components/Button';
import Container from 'ui/components/Container';
import RowContainer from 'ui/components/RowContainer';
import Loading from 'ui/components/Loading';
import Typography from 'ui/components/Typography';
import { withApollo } from 'utils/withApollo';

const Index = () => {
  const router = useRouter();
  const { data, loading } = useAuth();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  if (loading || !data?.me?.user) {
    return <Loading />;
  }

  const handleLogout = async () => {
    const res = await logout();

    if (res.data?.logout.message) {
      apolloClient.cache.reset();
      router.push('/signin');
    }
  };

  return (
    <>
      <RowContainer paddingLeft={16} paddingRight={16}>
        <Typography as="h2" fontSize={30} align="center" fontWeight={700}>
          Welcome {data?.me.user.username}!
        </Typography>
        <Button
          disabled={logoutLoading}
          title="Logout"
          type="button"
          variant="primary"
          size="large"
          onClick={handleLogout}
        />
      </RowContainer>
      <Container>
        <Todos />
      </Container>
    </>
  );
};

export default withApollo({ ssr: false })(Index);
