export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export interface FetchUsersResponse {
  message: string,
  users: User[],
  paginationInfo: {
    limit: number,
    offset: number,
    total: number,
  }
}

export interface FetchUsesrPayload {
  limit: number,
  offset: number,
}

export interface EditUserResponse {
  message: string,
}

export interface EditUserPayload {
  id: number,
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface DeleteUserResponse {
  message: string,
}
