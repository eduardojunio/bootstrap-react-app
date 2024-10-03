import { QueryFunction, QueryKey, useQuery } from 'react-query';

export function useRecord<K extends QueryKey, T>(key: K, queryFn: QueryFunction<T, K>) {
  const query = useQuery(key, queryFn);

  return {
    record: query.data,
    query,
  };
}
