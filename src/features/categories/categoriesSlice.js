import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { getCategoriesApi, addNewCategoryApi } from '../../api/categoriesApi'

const categoriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

const initialState = categoriesAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await getCategoriesApi('/api/categories')
  return response.json()
})

export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (initialCategory) => {
    const response = await addNewCategoryApi(initialCategory)
    return response.json()
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'successed'
      categoriesAdapter.upsertMany(state, action.payload)
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewCategory.fulfilled]: categoriesAdapter.addOne,
  },
})

export default categoriesSlice.reducer

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.categories)
