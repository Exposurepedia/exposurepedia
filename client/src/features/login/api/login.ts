import { postData } from '../../../api/postData';
import { User } from '../../../types';

/**
 * Sends a request to the server to log in a user
 * @param email The email of the user to log in
 * @param password The password for the user's account
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 * @returns {User}
 */
export async function login(email: string, password: string): Promise<User> {
  const lowercaseEmail = email.toLowerCase();
  const res = await postData('auth/login', {
    email: lowercaseEmail,
    password,
  });

  if (res.error && 'message' in res.error) {
    throw Error(res.error.message);
  }
  return res.data;
}
