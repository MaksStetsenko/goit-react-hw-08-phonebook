import { createSlice } from '@reduxjs/toolkit';

import { pandingHandler, rejectedHandler } from './contactsHandlers';

import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const initContacts = { items: [], isLoading: false, error: null };

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initContacts,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, pandingHandler)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, rejectedHandler)

      .addCase(addContact.pending, pandingHandler)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, rejectedHandler)

      .addCase(deleteContact.pending, pandingHandler)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(({ id }) => id !== payload);
      })
      .addCase(deleteContact.rejected, rejectedHandler);
  },
});

export const contactsReducer = contactsSlice.reducer;
