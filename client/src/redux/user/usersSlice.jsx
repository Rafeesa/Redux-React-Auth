// redux/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: [] };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    clearUsers: (state) => {
      state.list = [];
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u._id !== action.payload);
    },
    updateUser: (state, action) => {
      const i = state.list.findIndex(u => u._id === action.payload._id);
      if (i !== -1) state.list[i] = action.payload;
    }
  }
});

export const { setUsers, clearUsers, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
