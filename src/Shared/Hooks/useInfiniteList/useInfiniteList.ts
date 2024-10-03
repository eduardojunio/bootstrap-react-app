import { QueryFunction, QueryKey, useInfiniteQuery } from 'react-query';

export type Key = string;

export interface Keyable {
  key: Key;
}

export function useInfiniteList<K extends QueryKey, T extends Keyable[]>(key: K, queryFn: QueryFunction<T, K>) {
  const getPreviousPageParam = (firstPage: T) => (firstPage.length ? firstPage[0].key : undefined);

  const query = useInfiniteQuery(key, queryFn, { getPreviousPageParam });

  return {
    records: query.data?.pages?.flat() ?? [],
    query,
  };
}
