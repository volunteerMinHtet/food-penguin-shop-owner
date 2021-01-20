import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/auth/userSlice'
import foodsReducer from '../features/foods/foodSlice'
import categoriesReducer from '../features/categories/categoriesSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    foods: foodsReducer,
    categories: categoriesReducer,
  },
})
