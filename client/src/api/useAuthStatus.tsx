import { useQuery } from 'react-query';
import { getData } from './getData';

const fetchAuthStatus = () => getData('auth/authstatus');

export const authStatusQueryKey = ['authStatus'];

export const useAuthStatus = () => {
  const { isError, error, isRefetchError, ...rest } = useQuery(
    authStatusQueryKey,
    fetchAuthStatus,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  );
  return { ...rest, isError, isAuthorized: !isError };
};
