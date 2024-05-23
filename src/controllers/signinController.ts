import { Request, Response } from 'express';
import SigninService from '../services/signinService';

class SigninController {
  private readonly signinService: SigninService;
  constructor(signinService: SigninService) {
    this.signinService = signinService;
  }

  public handle = async (req: Request, res: Response) => {
    try {
      const signin = await this.signinService.handle(req.body);
      res.status(201).json(signin);
    } catch (error) {
      res.status(error.status || 500).send(error.message || 'Server Error');
    }
  };
}

export default SigninController;
