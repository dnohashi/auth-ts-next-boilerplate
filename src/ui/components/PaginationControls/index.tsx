import { useState } from 'react';

export interface PaginationControlsProps {
  canPaginate: boolean;
  currentPage: number;
  offset: number;
  totalPages: number;
  onUpdateCanPaginate: (canPaginate: boolean) => void;
  onUpdateCurrentPage: (pageNumber: number) => void;
  onUpdateOffset: () => void;
  onUpdateTotalPages: () => void;
}

interface IProps {
  children: (props: PaginationControlsProps) => JSX.Element;
}

function Pagination({ children }: IProps) {
  const [offset, setOffset] = useState(5);
  const [canPaginate, setCanPaginate] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const props: PaginationControlsProps = {
    canPaginate,
    currentPage,
    offset,
    totalPages,
    onUpdateCanPaginate: (canPaginate: boolean): void =>
      setCanPaginate(canPaginate),
    onUpdateCurrentPage: (pageNumber: number): void =>
      setCurrentPage(pageNumber),
    onUpdateOffset: (): void => setOffset((prevOffset) => prevOffset + 5),
    onUpdateTotalPages: (): void =>
      setTotalPages((prevTotalPages) => prevTotalPages + 1),
  };

  return <>{children(props)}</>;
}

export default Pagination;
