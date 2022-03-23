import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import apiService from '../../services/api';
import { EditUserPayload, FetchUsesrPayload } from '../../services/api/typings';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ limit, offset }: FetchUsesrPayload, thunkApi) => {
    try {
      const data = await apiService.fetchUsers({ limit, offset });
      return data;
    } catch (err) {
      thunkApi.rejectWithValue('Error fetching users, please try again.')
    }
  }
);

export const editUser = createAsyncThunk<
void,
EditUserPayload,
{
  rejectValue: string,
  state: RootState,
}
>(
  'users/editUser',
  async ({ id, first_name, last_name, email }: EditUserPayload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const { limit, offset } = getState().users.paginationInfo;
    try {
      await apiService.editUser({ id, first_name, last_name, email });
      dispatch(fetchUsers({ limit, offset }));
    } catch (err) {
      thunkApi.rejectWithValue('Error editing users, please try again.')
    }
  }
);

export const deleteUser = createAsyncThunk<
  void,
  number,
  {
    rejectValue: string,
    state: RootState,
  }
>(
  'users/deleteUser',
  async (id: number, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const { limit, offset } = getState().users.paginationInfo;
    try {
      await apiService.deleteUser(id);
      dispatch(fetchUsers({ limit, offset }));
    } catch (err) {
      thunkApi.rejectWithValue('Error deleting users, please try again.')
    }
  }
);
