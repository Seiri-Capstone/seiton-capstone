import { configureStore } from "@reduxjs/toolkit";

import kanbanReducer from "./kanbanSlice.js";

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
  },
});

export default store;
