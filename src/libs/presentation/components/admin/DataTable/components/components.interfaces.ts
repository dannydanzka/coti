/**
 * Interfaces for DataTable sub-components
 */

export interface NavigationButtonsProps {
  currentPage: number;
  onFirstPage: () => void;
  onLastPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  totalPages: number;
}

export interface PageNumbersProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export interface PerPageSelectorProps {
  itemsPerPage: number;
  itemsPerPageOptions: readonly number[];
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
