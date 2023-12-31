import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    name: "",
    id: "",
    image: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default userSlice.reducer;
