import { SERVER_DOMAIN } from './constant'

export const getFoods = (path) => {
  return fetch(`${SERVER_DOMAIN}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': ' application/json',
    },
  })
}
