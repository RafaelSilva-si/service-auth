import assert from 'assert';
import { describe } from 'mocha';
import SigninService from '../../services/signinService';
import AuthRepository from '../../repository/authRepository';
import * as generateTokenModule from '../../utils/helpers/auth';

import Sinon from 'sinon';
import AxiosClient from '../../infra/axiosClient';
import ServerError from '../../utils/errors/serverError';
import UnauthorizedError from '../../utils/errors/unauthorizedError';
import envs from '../../config/global';

describe('SignIn Teste', () => {
  const axiosClient = new AxiosClient(envs.USER_SERVICE_URL);
  const authRepository = new AuthRepository(axiosClient);
  const signinService = new SigninService(authRepository);

  Sinon.stub(generateTokenModule, 'generateToken').resolves('asddsasdasd');

  afterEach(() => {
    Sinon.restore();
  });

  it('Logar se usuário e senha forem corretos', async () => {
    Sinon.stub(AuthRepository.prototype, 'validateUser').resolves('123321');

    const authUser = {
      email: 'john1@example.com',
      password: 'password123',
    };

    const result = await signinService.handle(authUser);
    assert.deepEqual(result, { token: 'asddsasdasd' });
  });

  it('Retorna erro caso api retorne server error', async () => {
    Sinon.stub(AuthRepository.prototype, 'validateUser').rejects(
      new ServerError('Server error', 500),
    );

    const authUser = {
      email: 'john1@example.com',
      password: 'password123',
    };

    const promise = signinService.handle(authUser);
    await assert.rejects(promise, (error: ServerError) => {
      assert.deepEqual(error.message, 'Server error');
      assert.deepEqual(error.statusCode, 500);
      return true;
    });
  });

  it('Retornar erro se usuário estiver incorreto', async () => {
    Sinon.stub(AuthRepository.prototype, 'validateUser').rejects(
      new UnauthorizedError('Usuário não existe!', 401),
    );

    const authUser = {
      email: 'rafael2@test.com',
      password: 'password123',
    };

    const promise = signinService.handle(authUser);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.message, 'Usuário não existe!');
      assert.deepEqual(error.statusCode, 401);
      return true;
    });
  });

  it('Retornar erro se senha estiver incorreta', async () => {
    Sinon.stub(AuthRepository.prototype, 'validateUser').rejects(
      new UnauthorizedError('Senha Inválida', 401),
    );

    const authUser = {
      email: 'john1@example.com',
      password: 'password12',
    };

    const promise = signinService.handle(authUser);
    await assert.rejects(promise, (error: any) => {
      assert.deepEqual(error.message, 'Senha Inválida');
      assert.deepEqual(error.statusCode, 401);
      return true;
    });
  });
});
