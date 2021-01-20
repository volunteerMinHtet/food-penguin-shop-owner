import { API_URL } from '../constant'

export const login = (data) => {
  return fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
}

export const setUserInLocalStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData))
}

export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const getTokenFromLocalStorage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  return loggedInUser.token
}
