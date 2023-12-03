import { getData } from '../../../api/getData';
import { postData } from '../../../api/postData';

/**
 * Sends a request to the server to log in a user
 * @param email The email of the user to log in
 * @param password The password for the user's account
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
export async function loginUser(email: string, password: string) {
  const lowercaseEmail = email.toLowerCase();
  const res = await postData('auth/login', {
    email: lowercaseEmail,
    password,
  });
  // const resFilters = await getData('exposure/filterOptions');

  if (res.error && 'message' in res.error) {
    throw Error(res.error.message);
  }
  // if (resFilters.error) {
  //   throw Error(resFilters.error.message);
  // }

  console.log('res.data', res.data);
  const newRes = {
    ...res.data,
    // filters: resFilters.data
  };
  return newRes;
}
