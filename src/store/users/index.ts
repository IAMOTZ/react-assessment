import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, editUser, deleteUser } from './actions';
import { UsersState } from './typings';


const initialState: UsersState = {
  users: [],
  paginationInfo: {
    limit: 20,
    offset: 0,
    total: 0,
  },
  isFetchingUsers: false,
  fetchingUsersSuccess: false,
  fetchingUsersError: null,

  isEditingUser: false,
  editingUserSuccess: false,
  editingUserError: null,

  isDeletingUser: false,
  deletingUserSuccess: false,
  deletingUserError: null,
}


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPaginationInfo: (state, action) => {
      state.paginationInfo.limit = action.payload.limit ?? state.paginationInfo.limit;
      state.paginationInfo.offset = action.payload.offset ?? state.paginationInfo.offset;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isFetchingUsers = true;
        state.fetchingUsersSuccess = false;
        state.fetchingUsersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isFetchingUsers = false;
        state.fetchingUsersSuccess = true;
        state.fetchingUsersError = null;
        state.users = action.payload?.users || [];
        state.paginationInfo = action.payload?.paginationInfo || initialState.paginationInfo;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isFetchingUsers = false;
        state.fetchingUsersSuccess = false;
        // state.fetchingUsersError = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isEditingUser = true;
        state.editingUserSuccess = false;
        state.editingUserError = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isEditingUser = false;
        state.editingUserSuccess = true;
        state.editingUserError = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isEditingUser = false;
        state.editingUserSuccess = false;
        // @todo: re-enable when action is configured
        // state.editingUserError = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isDeletingUser = true;
        state.deletingUserSuccess = false;
        state.deletingUserError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeletingUser = false;
        state.deletingUserSuccess = true;
        state.deletingUserError = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeletingUser = false;
        state.deletingUserSuccess = true;
        // @todo: re-enable when action is configured
        // state.deletingUserError = action.payload || '';
      });
  },
});

export default usersSlice.reducer;

// @todo: Kep this as part of actions exports
export const { setPaginationInfo } = usersSlice.actions;

