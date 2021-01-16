import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { getFoodsApi, addNewFoodApi } from '../../api/foodApi'

const foodsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

const initialState = foodsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () => {
  const response = await getFoodsApi('/api/foods')
  return response.json()
})

export const addNewFood = createAsyncThunk('foods/addNewFood', async (initialFood) => {
  const response = await addNewFoodApi(initialFood)
  return response.json()
})

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFoods.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchFoods.fulfilled]: (state, action) => {
      state.status = 'successed'
      foodsAdapter.upsertMany(state, action.payload)
    },
    [fetchFoods.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewFood.fulfilled]: foodsAdapter.addOne,
  },
})

export default foodsSlice.reducer

export const {
  selectAll: selectAllFoods,
  selectById: selectFoodById,
  selectIds: selectFoodIds,
} = foodsAdapter.getSelectors((state) => state.foods)
