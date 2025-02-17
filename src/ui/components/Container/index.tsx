import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    padding: 16px;
    width: 100%;
  }
`;

export default Container;
