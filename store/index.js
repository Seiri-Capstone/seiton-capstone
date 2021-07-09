import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { projectApi } from './apiSlice'
import projectReducer from './projectSlice'

const store = configureStore({
  reducer: {
    project: projectReducer,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(projectApi.middleware)
})

setupListeners(store.dispatch)
export default store
