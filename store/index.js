import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { projectApi } from './apiSlice'
import projectReducer from './projectSlice'
import projectsReducer from './projectsSlice'
import orgsReducer from './orgsSlice'
import orgReducer from './orgSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    project: projectReducer,
    orgs: orgsReducer,
    org: orgReducer,
    projects: projectsReducer,
    user: userReducer
    // [projectApi.reducerPath]: projectApi.reducer
  }
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(projectApi.middleware)
})

setupListeners(store.dispatch)
export default store
