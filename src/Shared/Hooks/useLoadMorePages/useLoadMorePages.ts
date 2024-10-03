import { UseInfiniteQueryResult } from 'react-query';
import { useScrollHandler } from '../useScrollHandler/useScrollHandler';

export function useLoadMorePages(query: UseInfiniteQueryResult) {
  useScrollHandler({
    onBottomReached: () => {
      if (query.hasPreviousPage && !query.isFetchingPreviousPage) {
        void query.fetchPreviousPage();
      }
    },
  });
}
