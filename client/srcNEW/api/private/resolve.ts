import { ResolvedReq } from './types';

/**
 * a function which resolves a response promise from axios and returns an object with the data and error properties. If the response is successful, the data property will be set to the response data. If the response is an error, the error property will be set to the error and error.message property will be set to the error message if it exists.
 * @param promise - the promise to resolve
 * @returns an object with data property set to the response data if the response is successful and is unassigned otherwise, an error property set to the error if the response is an error or is unassigned otherwise, and an error.message property set to the error message if it exists on the error object.
 */
export default async function resolve(promise: Promise<any>) {
  const resolved: ResolvedReq = {
    data: null,
    error: null,
  };

  try {
    const res = await promise;
    resolved.data = res.data;
  } catch (e) {
    // Attaches error so description is accessed at resolved.error.message
    const err: Error | any = e;
    if (err.response) {
      // Handles populating error with data from an error thrown by the server
      resolved.error = err.response;
      resolved.error.message = err.response.data.message;
    } else {
      // Handles case for axios errors
      resolved.error = err;
    }
  }
  return resolved;
}
