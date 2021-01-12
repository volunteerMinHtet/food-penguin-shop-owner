import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { getFoods } from '../../api/foodApi'

const foodsAdapter = createEntityAdapter()

const initialState = foodsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchFoods = createAsyncThunk('foods/fetchFoods', async () => {
  const response = await getFoods('/api/foods')
  return response.json()
})

export const addNewFood = createAsyncThunk('foods/addNewFood', async (initialFood) => {
  return initialFood
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
