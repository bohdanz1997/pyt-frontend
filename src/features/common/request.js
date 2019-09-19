import axios, { AxiosRequestConfig } from 'axios'

/**
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} method
 * @param {string} url
 * @param {AxiosRequestConfig} options
 */
export const request = async (method, url, options = {}) => {
  const baseUrl = process.env.REACT_APP_API_HOST || 'http://localhost:8080/api'
  const token = 'gg'

  const response = await axios({
    method,
    url: `${baseUrl}${url}`,
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  return response.data
}
