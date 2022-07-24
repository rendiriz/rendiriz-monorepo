import { useReducer } from 'react';
import type { TPaginationTableFilter } from '@rendiriz-ecosystem/shared/types';

function reducer(
  state: TPaginationTableFilter,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case 'perPage':
      return { ...state, perPage: action.payload.perPage, page: 1 };
    case 'page':
      return { ...state, page: action.payload.page };
    default:
      throw new Error();
  }
}

export function useTablePagination({ perPage, page }: TPaginationTableFilter) {
  const [state, dispatch] = useReducer(reducer, { perPage, page });

  return { state, dispatch };
}

export default useTablePagination;
