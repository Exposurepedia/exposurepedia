import axios from 'axios';
import resolve from './resolve';
import { URLPREFIX } from './url';

// So cookies can be sent automatically with requests
axios.defaults.withCredentials = true;

/**
 * A function which makes a delete request to the server when given a url and an optional body and returns the response data after it is resolved by the {@link resolve} function.
 * @param url - a string representing the url to make the request to. The format should be 'router/endpoint'
 * @param data - an optional object containing the data in json format to send to the server. Default is an empty object
 * @returns the response from the server after being resolved by the {@link resolve} function
 */
export async function deleteData(url: string, data = {}) {
  const response = await resolve(axios.delete(`${URLPREFIX}/${url}`, data));
  return response;
}
