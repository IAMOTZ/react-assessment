export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export interface UsersState {
  users: User[],
  paginationInfo: {
    limit: number,
    offset: number,
    total: number,
  },
  isFetchingUsers: boolean,
  fetchingUsersSuccess: boolean,
  fetchingUsersError: null | string,

  isEditingUser: boolean,
  editingUserSuccess: boolean,
  editingUserError: null | string,

  isDeletingUser: boolean,
  deletingUserSuccess: boolean,
  deletingUserError: null | string,
}
