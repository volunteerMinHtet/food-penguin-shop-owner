import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { getFoodsApi, addNewFoodApi } from '../../services/food/foodService'

const foodsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

const initialState = foodsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () => {
  const response = await getFoodsApi()
  console.log(response)
  return response
})

export const addNewFood = createAsyncThunk('foods/addNewFood', async (initialFood) => {
  const response = await (await addNewFoodApi(initialFood)).json()

  return response
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
      if (action.payload.success) {
        state.status = 'successed'
        foodsAdapter.upsertMany(state, action.payload.data)
      } else if (!action.payload.success) {
        state.status = 'failed'
        state.error = action.payload.message
      }
    },
    [fetchFoods.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = 'Unknown error'
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
