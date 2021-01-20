import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

import { getCategoriesApi, addNewCategoryApi } from '../../services/category/categoryService'

const categoriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.updated_at.localeCompare(a.updated_at),
})

const initialState = categoriesAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await getCategoriesApi()
  // console.log(response)
  return response
})

export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (initialCategory) => {
    const response = await addNewCategoryApi(initialCategory)
    console.log(response)
    return response
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
      if (action.payload.success) {
        state.status = 'successed'
        categoriesAdapter.upsertMany(state, action.payload.data)
      } else if (!action.payload.success) {
        state.status = 'failed'
        state.error = action.payload.message
      }
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = 'Unknown error'
    },
    // [addNewCategory.fulfilled]: categoriesAdapter.addOne,
    [addNewCategory.fulfilled]: (state, action) => {
      if (action.payload.success) {
        categoriesAdapter.upsertOne(state, action.payload.data)
      } else if (!action.payload.success) {
        state.error = action.payload.message
      }
    },
  },
})

export default categoriesSlice.reducer

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors((state) => state.categories)
