import AxiosClient from '../infra/axiosClient';
import ServerError from '../utils/errors/serverError';
import { AuthRequest } from '../utils/types/signin';

class AuthRepository {
  private readonly axiosClient: AxiosClient;
  constructor(axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async validateUser(data: AuthRequest): Promise<any> {
    try {
      return await this.axiosClient.post('/validate', data);
    } catch (error) {
      throw new ServerError(error.response.data, error.response.status);
    }
  }
}

export default AuthRepository;
