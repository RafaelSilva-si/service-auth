import { Router } from 'express';
import AuthRepository from './repository/authRepository';
import AxiosClient from './infra/axiosClient';
import SigninService from './services/signinService';
import SigninController from './controllers/signinController';
import envs from './config/global';

const router = Router();
const axiosClient = new AxiosClient(envs.USER_SERVICE_URL);
const authRepository = new AuthRepository(axiosClient);
const signinService = new SigninService(authRepository);
const signinController = new SigninController(signinService);

router.post('/', signinController.handle);

export default router;
