import { API_URL } from '../constant'

import { getTokenFromLocalStorage } from '../auth/authenticationService'

const token = getTokenFromLocalStorage()

export const getCategoriesApi = () => {
  return fetch(`${API_URL}/api/categories`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json()
  })
}

export const addNewCategoryApi = (data) => {
  return fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
    }),
  }).then((response) => {
    return response.json()
  })
}
