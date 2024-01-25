import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  token: string;
}

export default class LoginService {
  private baseURL: string = 'http://localhost:8080/auth';

  constructor() {
  }

  private getAuthConfig() {
    return { };
  }

  async login(lastName: string, password: string): Promise<LoginResponse | null> {
    try {
      const params = new URLSearchParams();
      params.append('lastName', lastName);
      params.append('password', password);

      const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(
          `${this.baseURL}/checkPassword`,
          params,
          this.getAuthConfig()
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  private handleError(error: any) {
    console.error('Login failed:', error);
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
}
