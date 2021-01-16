import { SERVER_DOMAIN } from './constant'

export const getFoodsApi = (path) => {
  return fetch(`${SERVER_DOMAIN}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': ' application/json',
    },
  })
}

export const addNewFoodApi = (data) => {
  return fetch(`${SERVER_DOMAIN}/api/foods`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      category_id: data.category,
      price: data.price,
    }),
  })
}
