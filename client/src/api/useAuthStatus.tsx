import useData from './useData';

export const useAuthStatus = (): { isAuthorized: boolean } => {
  const data = useData('auth/authstatus');
  return data?.error ? { isAuthorized: false } : { isAuthorized: true };
};
