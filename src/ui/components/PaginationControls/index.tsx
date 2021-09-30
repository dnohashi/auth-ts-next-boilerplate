import { useState } from 'react';

export interface PaginationControlsProps {
  currentPage: number;
  onResetCurrentPage: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface IProps {
  children: (props: PaginationControlsProps) => JSX.Element;
}

function Pagination({ children }: IProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const props: PaginationControlsProps = {
    currentPage,
    onResetCurrentPage: () => setCurrentPage(0),
    onNext: () => {
      const expectedPage = currentPage + 1;

      setCurrentPage(expectedPage);
    },
    onPrevious: () => {
      const expectedPage = currentPage - 1;

      setCurrentPage(expectedPage);
    },
  };

  return <>{children(props)}</>;
}

export default Pagination;
