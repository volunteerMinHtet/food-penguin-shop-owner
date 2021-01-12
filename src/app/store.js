import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from '../features/foods/foodSlice'
import categoriesReducer from '../features/categories/categoriesSlice'

export default configureStore({
  reducer: {
    foods: foodsReducer,
    categories: categoriesReducer,
  },
})
