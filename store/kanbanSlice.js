import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { first: "last", key: "value" };

//async
export const fetchKanbanThunk = createAsyncThunk(
  "kanban/fetchKanban",
  async (kanbanId) => {
    const response = await fetch("api/kanban");
    return response.data;
  }
);

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    fetchKanban(state) {
      state = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchKanban.fulfilled]: (state, action) => {
  //     //return sth here
  //   },
  // },
});

export const { fetchKanban } = kanbanSlice.actions;
export default kanbanSlice.reducer;
