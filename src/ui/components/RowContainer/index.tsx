import type { RowContainerProps } from 'ui/interfaces';
import Spinner from '../Spinner';
import StyledRowContainer from './styles';

const RowContainer = (props: RowContainerProps) => (
  <StyledRowContainer {...props}>
    {props.isLoading ? <Spinner /> : <>{props.children}</>}
  </StyledRowContainer>
);

export default RowContainer;
