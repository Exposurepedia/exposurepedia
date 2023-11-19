import axios from 'axios';
import resolve from './resolve';
import { URLPREFIX } from './url';

// So cookies can be sent automatically with requests
axios.defaults.withCredentials = true;

/**
 * A function which makes a GET request to the server when given a url and returns the response data after it is resolved by the {@link resolve} function.
 * @param url - a string representing the url to make the request to. The format should be 'router/endpoint'
 * @returns the response data from the server
 */
export async function getData(url: string) {
  const response = await resolve(axios.get(`${URLPREFIX}/${url}`));
  return response;
}
