import { configureStore } from '@reduxjs/toolkit'

import projectReducer from './projectSlice.js'

const store = configureStore({
  reducer: {
    project: projectReducer
  }
})

export default store
