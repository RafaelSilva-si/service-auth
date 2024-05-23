import AuthRepository from '../repository/authRepository';
import UnauthorizedError from '../utils/errors/unauthorizedError';
import { generateToken } from '../utils/helpers/auth';
import { AuthRequest, AuthResponse } from '../utils/types/signin';

class SigninService {
  private readonly authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async handle(data: AuthRequest): Promise<AuthResponse> {
    try {
      const result = await this.authRepository.validateUser(data);
      return { token: await generateToken(result) };
    } catch (error) {
      throw new UnauthorizedError(error.message, error.statusCode);
    }
  }
}

export default SigninService;
