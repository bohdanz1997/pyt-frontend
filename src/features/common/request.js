import axios, { AxiosRequestConfig } from 'axios'
import { $token } from './model/token'

/**
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} method
 * @param {string} url
 * @param {AxiosRequestConfig} options
 */
export const request = async (method, url, options = {}) => {
  const baseUrl = process.env.REACT_APP_API_HOST
  const token = $token.getState()

  const response = await axios({
    method,
    url: `${baseUrl}${url}`,
    ...options,
    headers: {
      Authorization: `bearer ${token}`,
      ...options.headers,
    },
  })

  return response.data
}
