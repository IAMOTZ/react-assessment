import axios from 'axios';
import { DeleteUserPayload, DeleteUserResponse, EditUserPayload, EditUserResponse, FetchUsersResponse } from './typings';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class ApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}`
    });
  }

  fetchUsers = async ({ limit, offset }: { limit?: number, offset?: number }): Promise<FetchUsersResponse> => {
    return this.axiosInstance.get<FetchUsersResponse>(
      `/users`,
      { params: { limit, offset } }
    ).then(res => res.data);
  }

  editUser = async ({ userId, ...body }: EditUserPayload): Promise<EditUserResponse> => {
    return this.axiosInstance.put<EditUserResponse>(
      `/users/${userId}`,
      body,
    ).then(res => res.data);
  }

  deleteUser = async ({ userId }: DeleteUserPayload): Promise<DeleteUserResponse> => {
    return this.axiosInstance.delete<DeleteUserResponse>(
      `/users/${userId}`,
    ).then(res => res.data);
  }
}

const apiService = new ApiService();

export default apiService;