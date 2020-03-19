
import axios from 'axios'
const _baseApiURL = `${process.env.VUE_APP_API_BASE_URL}`
// const _baseAppURL = `${process.env.VUE_APP_ROOT_URL}`;

export const baseApiURL = _baseApiURL
// export const baseAppURL = _baseAppURL;

export const api = axios.create({
  baseURL: _baseApiURL,
  headers: {
    Accept: 'application/vnd.api+json; charset=utf-8'
    // 'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
  }
  // withCredentials: true
})

export default api
