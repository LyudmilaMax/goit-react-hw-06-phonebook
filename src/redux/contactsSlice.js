import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contact',
  initialState: { values: [] },
  reducers: {
    addContact(state, action) {
      state.values.push(action.payload);
    },

    deleteContact(state, action) {
      const index = state.values.findIndex(
        element => element.id === action.payload
      );
      state.values.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
