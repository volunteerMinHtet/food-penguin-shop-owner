import React from 'react'

import { useSelector } from 'react-redux'

import { selectCategoryById } from '../categories/categoriesSlice'

export const FoodCategory = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))

  return <React.Fragment>{category.name}</React.Fragment>
}
