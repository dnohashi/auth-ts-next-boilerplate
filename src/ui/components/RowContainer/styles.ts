import styled from 'styled-components';
import { RowContainerProps } from 'ui/interfaces';

const StyledRowContainer = styled.div<RowContainerProps>`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ paddingLeft }) => `${paddingLeft}px` ?? '0px'};
  padding-right: ${({ paddingRight }) => `${paddingRight}px` ?? '0px'};

  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
`;

export default StyledRowContainer;
