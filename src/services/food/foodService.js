import { API_URL } from '../constant'

import { getTokenFromLocalStorage } from '../auth/authenticationService'

const token = getTokenFromLocalStorage()

export const getFoodsApi = () => {
  return fetch(`${API_URL}/api/foods`, {
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

export const addNewFoodApi = (data) => {
  return fetch(`${API_URL}/api/foods`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      category_id: data.category,
      price: data.price,
    }),
  })
}
