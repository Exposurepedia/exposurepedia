import { postData } from '../../../api/postData';

/**
 * Makes a request to the server to logout a user from the current session
 * @returns true if successful, false otherwise
 */
export async function logout() {
  const res = await postData('auth/logout');
  if (res.error) return false;
  return true;
}