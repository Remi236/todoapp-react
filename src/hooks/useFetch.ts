import { getErrorMessage } from '../helpers';
import { FetchReturns, FetchMethod } from '../models';

const DEFAULT_DATA = {};
const DEFAULT_OPTIONS: RequestInit = {};
const DEFAULT_HEADERS: HeadersInit = { 'Content-Type': 'application/json' };
const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:3000';

export const api = async <T>(
  method: FetchMethod,
  route: string,
  data = DEFAULT_DATA,
  headers: HeadersInit = DEFAULT_HEADERS,
  options = DEFAULT_OPTIONS,
): Promise<FetchReturns<T>> => {
  try {
    const body = method === 'GET' ? undefined : JSON.stringify(data);
    const res = await window.fetch(`${BASE_API}/${route}`, {
      ...options,
      method,
      headers,
      body,
    });
    return res.status >= 200 && res.status < 300
      ? { json: await res.json(), error: null, statusCode: res.status }
      : { json: null, error: res.statusText, statusCode: res.status };
  } catch (err) {
    return { json: null, error: getErrorMessage(err), statusCode: null };
  }
};
