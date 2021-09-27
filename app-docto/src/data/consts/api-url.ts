import { __DEV__ } from './dev-settings';

let DEV_API_URL = '';
DEV_API_URL = 'http://localhost:3000/';

const API_URL = !__DEV__ ? 'http://localhost:3000/' : DEV_API_URL;

export { API_URL };
