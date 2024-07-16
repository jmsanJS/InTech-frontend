import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    articlesSearchResults: (state, action) => {
      state.value.push(action.payload)
    },
    removeOldArticlesSearch: (state) => {
      state.value = []
    }
  },
});

export const { articlesSearchResults, removeOldArticlesSearch } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;