import axios from 'axios';
import { DeleteUserResponse, EditUserPayload, EditUserResponse, FetchUsersResponse } from './typings';

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

  editUser = async ({ id, ...body }: EditUserPayload): Promise<EditUserResponse> => {
    return this.axiosInstance.put<EditUserResponse>(
      `/users/${id}`,
      body,
    ).then(res => res.data);
  }

  deleteUser = async (id: number): Promise<DeleteUserResponse> => {
    return this.axiosInstance.delete<DeleteUserResponse>(
      `/users/${id}`,
    ).then(res => res.data);
  }
}

const apiService = new ApiService();

export default apiService;