import { NumberedPagination } from "../ui/numbered-pagination";

type NumberedPaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 4,
  onPageChange,
}: NumberedPaginationProps) => {
  return (
    <div className="mt-6 md:mt-8 lg:mt-10">
      <NumberedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginationItemsToDisplay={paginationItemsToDisplay}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PaginationComponent;
