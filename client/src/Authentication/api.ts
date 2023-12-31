/**
 * A file for defining functions used to interact with the backend server
 * for authentication purposes.
 */
import { getData, postData } from '../util/api';

/**
 * Sends a request to the server to log in a user
 * @param email The email of the user to log in
 * @param password The password for the user's account
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function loginUser(email: string, password: string) {
  const lowercaseEmail = email.toLowerCase();
  const res = await postData('auth/login', {
    email: lowercaseEmail,
    password,
  });
  const resFilters = await getData('exposure/filterOptions');

  if (res.error) {
    throw Error(res.error.message);
  }
  if (resFilters.error) {
    throw Error(resFilters.error.message);
  }

  const newRes = { ...res.data, filters: resFilters.data };
  return newRes;
}

/**
 * Sends a request to the server to verify an account
 * @param verificationToken The token used to identify the verification attempt
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function verifyAccount(verificationToken: string) {
  const res = await postData('auth/verify-account', {
    token: verificationToken,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to register a user for an account
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @param isProfessional
 * @param profession
 * @param degree
 * @param degree
 * @param settings
 * @param percentCaseload
 * @param difficulty
 * @throws An {@link Error} with a `messsage` field describing the issue in verifying
 */
async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isProfessional: string,
  profession: string,
  degree: string,
  settings: string[],
  percentCaseload: number,
  difficulty: number,
) {
  const lowercaseEmail = email.toLowerCase();
  const res = await postData('auth/register', {
    firstName,
    lastName,
    email: lowercaseEmail,
    password,
    isProfessional,
    profession,
    degree,
    settings,
    percentCaseload,
    difficulty,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to email a reset password link to a user
 * @param email The email of the user
 * @throws An {@link Error} with a `messsage` field describing the issue in
 * sending the email
 */
async function sendResetPasswordEmail(email: string) {
  const lowercaseEmail = email.toLowerCase();
  const res = await postData('auth/send-reset-password-email', {
    email: lowercaseEmail,
  });
  if (res.error) {
    throw Error(res.error.message);
  }
}

/**
 * Sends a request to the server to reset a password for a user
 * @param password The new password for the user
 * @param token The token identifying the reset password attempt
 * @throws An {@link Error} with a `messsage` field describing the issue in
 * resetting the password
 */
async function resetPassword(password: string, token: string) {
  const res = await postData('auth/reset-password', { password, token });
  if (res.error) {
    throw Error(res.error.message);
  }
}

export {
  register,
  loginUser,
  verifyAccount,
  sendResetPasswordEmail,
  resetPassword,
};
