import axios from 'axios';
import { api_url } from './constants';
import { token } from './constants';

export default (method, url, params = {}, headers = "", responseType) => {
     method = method.toLowerCase();
    let storeData = localStorage.getItem(token);
    let opts = {
        method: method,
        url: api_url + url,
        headers: {
            token: storeData ? storeData : ''
        }
    };
    if (method === 'get'){
        opts.params = params;}
    else
      {  opts.data = params;}

    if (headers) {
        opts.headers = Object.assign(opts.headers, headers);
    }
    if (responseType) {
        opts.responseType = responseType;
    }
    opts.validateStatus = (status) => {
        return true;
    }
    return axios(opts);
}