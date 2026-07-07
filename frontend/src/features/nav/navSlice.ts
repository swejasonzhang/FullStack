import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  category: string;
  term: string;
}

const initialState: NavState = {
  category: "All Departments",
  term: "",
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
  },
});

export const { setCategory, setTerm } = navSlice.actions;
export default navSlice.reducer;
