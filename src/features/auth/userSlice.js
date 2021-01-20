import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  login,
  setUserInLocalStorage,
  getUserFromLocalStorage,
} from '../../services/auth/authenticationService'

const initialState = {
  email: null,
  name: null,
  isLoggedIn: false,
  error: null,
}

export const userLogin = createAsyncThunk('user/userLogin', async (data) => {
  const response = await (await login(data)).json()

  return response.data
})

export const checkUserLoggedIn = createAsyncThunk('user/checkUserLoggedIn', async () => {
  const response = await getUserFromLocalStorage()

  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.isLoggedIn = false
        state.error = action.payload.error
        state.email = null
        state.name = null
      } else {
        state.isLoggedIn = true
        state.email = action.payload.email
        state.name = action.payload.name
        state.error = null

        setUserInLocalStorage({
          email: action.payload.email,
          name: action.payload.name,
          token: action.payload.token,
        })
      }
    },
    [checkUserLoggedIn.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true
        state.email = action.payload.email
        state.name = action.payload.name
      } else {
        state.isLoggedIn = false
        state.email = null
        state.name = null
      }
    },
  },
})

export default userSlice.reducer
