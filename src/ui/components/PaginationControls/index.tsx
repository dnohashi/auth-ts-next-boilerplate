import { useState } from 'react';

export interface PaginationControlsProps {
  currentPage: number;
  totalItems: number;
  onSetTotalItems: (total: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface IProps {
  children: (props: PaginationControlsProps) => JSX.Element;
}

function Pagination({ children }: IProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(1);

  const props: PaginationControlsProps = {
    currentPage,
    totalItems,
    onSetTotalItems: (total: number): void => setTotalItems(total),
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
