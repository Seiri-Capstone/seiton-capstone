import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { projectApi } from './apiSlice'
import projectReducer from './projectSlice'
import projectsReducer from './projectsSlice'
import orgsReducer from './orgsSlice'
import orgReducer from './orgSlice'
import invitationsReducer from './invitationsSlice'
import invitationReducer from './invitationSlice'

const store = configureStore({
  reducer: {
    orgs: orgsReducer,
    org: orgReducer,
    projects: projectsReducer,
    project: projectReducer,
    invitations: invitationsReducer,
    invitation: invitationReducer
    // [projectApi.reducerPath]: projectApi.reducer
  }
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(projectApi.middleware)
})

setupListeners(store.dispatch)
export default store
