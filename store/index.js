import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { projectApi } from './apiSlice'
import projectReducer from './projectSlice'
import orgsReducer from './orgsSlice'

const store = configureStore({
  reducer: {
    project: projectReducer,
    orgs: orgsReducer
    // [projectApi.reducerPath]: projectApi.reducer
  }
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(projectApi.middleware)
})

setupListeners(store.dispatch)
export default store
