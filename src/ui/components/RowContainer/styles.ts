import styled from 'styled-components';

const StyledRowContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
`;

export default StyledRowContainer;
