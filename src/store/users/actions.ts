import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import { DeleteUserPayload, EditUserPayload, FetchUsesrPayload } from '../../services/api/typings';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ limit, offset }: FetchUsesrPayload, thunkApi) => {
    try {
      const data = await apiService.fetchUsers({ limit, offset });
      return data.users;
    } catch (err) {
      thunkApi.rejectWithValue('Error fetching users, please try again.')
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ userId, first_name, last_name, email }: EditUserPayload, thunkApi) => {
    try {
      await apiService.editUser({ userId, first_name, last_name, email });
    } catch (err) {
      thunkApi.rejectWithValue('Error editing users, please try again.')
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId }: DeleteUserPayload, thunkApi) => {
    try {
      await apiService.deleteUser({ userId });
    } catch (err) {
      thunkApi.rejectWithValue('Error deleting users, please try again.')
    }
  }
);
