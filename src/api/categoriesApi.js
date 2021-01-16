import { SERVER_DOMAIN } from './constant'

export const getCategoriesApi = (path) => {
  return fetch(`${SERVER_DOMAIN}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const addNewCategoryApi = (data) => {
  return fetch(`${SERVER_DOMAIN}/api/categories`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
    }),
  })
}
