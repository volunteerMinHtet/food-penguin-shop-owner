import React, { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrimaryLoading from '../components/loading/PrimaryLoading'

const FoodsList = lazy(() => import('../features/foods/FoodsList'))
const AddFoodForm = lazy(() => import('../features/foods/AddFoodForm'))

const CategoriesList = lazy(() => import('../features/categories/CategoriesList'))
const AddCategoryForm = lazy(() => import('../features/categories/AddCategoryForm'))

const RootRouter = () => (
  <Suspense fallback={<PrimaryLoading />}>
    <Switch>
      <Route exact path="/" component={FoodsList} />
      <Route exact path="/foods" component={FoodsList} />
      <Route exact path="/foods/add" component={AddFoodForm} />
      <Route exact path="/categories" component={CategoriesList} />
      <Route exact path="/categories/add" component={AddCategoryForm} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
)

export default RootRouter
